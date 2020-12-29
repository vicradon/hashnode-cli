import * as inquirer from "inquirer";
import { Command, flags } from "@oclif/command";
import { graphql } from "@octokit/graphql";
import tempFile from "../utils/tempFile";
import Tag from "../interfaces/Tag";

const Configstore = require("configstore");
const fs = require("fs");
const util = require("util");

const config = new Configstore("hashnode-cli");
const readFile = util.promisify(fs.readFile);

// This overwrites the default list prompt. Add types to the search list package in the future
inquirer.registerPrompt("list", require("inquirer-search-list"));

const graphqlWithAuth = graphql.defaults({
  baseUrl: "https://api.hashnode.com/graphql",
  headers: {
    authorization: config.get("token"),
  },
});

export default class CreatePost extends Command {
  static description =
    "Creates a post on your hashnode blog from a markdown file.";

  static flags = {
    help: flags.help({ char: "h" }),
    title: flags.string({ char: "t", description: "post title" }),
  };

  async run() {
    const { flags } = this.parse(CreatePost);

    if (!config.get("token")) {
      console.log("You are not authenticated. Please run 'hashnode-cli login'");
      return;
    }

    try {
      let title = flags.title;

      if (!title) {
        title = await inquirer.prompt({
          name: "title",
          message: "Post title?",
          validate: function (title) {
            if (title.trim().length < 6) {
              return "Title too short.";
            }
            return true;
          },
        });
      }

      const temp = await tempFile({
        name: title,
      });

      let tagCategories: Tag[] = config.get("tag-categories");

      if (!tagCategories) {
        const tagCategoriesRes: {
          tagCategories: Tag[];
        } = await graphqlWithAuth(
          `
          query {
            tagCategories{
              _id
              name
            }
          }
          `
        );
        tagCategories = tagCategoriesRes.tagCategories;

        config.set("tag-categories", tagCategories);
      }

      require("child_process").spawnSync("nano", [temp], {
        stdio: "inherit",
        detached: true,
      });

      const selectedTags: Tag[] = [];

      tagCategories.push({ _id: "undefined", name: "none" });
      const getTags = async () => {
        for (let i = 1; i <= 5; i++) {
          const { tag } = await inquirer.prompt({
            name: `tag`,
            message: `input tag ${i} (enter 'none' to skip)?`,
            type: "list",
            choices: tagCategories,
          });

          if (tag !== "none") {
            const tagCategoryIndex = tagCategories.findIndex(
              (t) => t.name === tag
            );
            tagCategories.splice(tagCategoryIndex, 1);

            selectedTags.push(tagCategories[tagCategoryIndex]);
          }
        }
      };

      while (selectedTags.length === 0) {
        await getTags();
      }

      const contentMarkdown = await readFile(temp, "utf8");

      const { createStory } = await graphqlWithAuth(
        `
        mutation storyCreation($title: String!, $contentMarkdown: String!, $tags: [TagsInput]!) {
          createStory(
            input: {
              title: $title
              contentMarkdown: $contentMarkdown
              tags: $tags
            }
          ) {
            success
            message
            post{
              slug
              cuid
            }
          }
        }
        `,
        {
          title,
          contentMarkdown,
          tags: selectedTags,
        }
      );

      console.log(
        `${createStory.message}. \nView your post here. https://hashnode.com/post/${createStory.post.slug}-${createStory.post.cuid}`
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}
