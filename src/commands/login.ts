import { Command, flags } from "@oclif/command";
const Configstore = require("configstore");
const open = require("open");
import * as inquirer from "inquirer";

const config = new Configstore("hashnode-cli");
export default class Login extends Command {
  static description = "authenticate the CLI by pasting your developer token";

  static flags = {
    help: flags.help({ char: "h" }),
    token: flags.string({
      char: "t",
      description: "Hashnode token from the developer settings",
    }),
  };

  async run() {
    const { flags } = this.parse(Login);

    if (flags.token) {
      config.set("token", flags.token);
      console.log("Token securely saved.");
      return;
    }

    this.log("Opening the developer settings.");
    await open("https://hashnode.com/settings/developer");

    inquirer
      .prompt([{ name: "token", message: "Paste Hashnode developer token?" }])
      .then(({ token }) => {
        config.set("token", token);
        console.log("Token securely saved.");
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("Sometime went wrong, please try again");
        }
      });
  }
}
