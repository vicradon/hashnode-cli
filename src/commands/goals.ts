import { Command, flags } from "@oclif/command";
const Configstore = require("configstore");
const config = new Configstore("hashnode-cli");

export default class Goals extends Command {
  static description = "Set your writing goals or retreive them";

  static flags = {
    help: flags.help({ char: "h" }),
    new: flags.string({ char: "n", description: "set a new writing goal" }),
  };

  async run() {
    const { flags } = this.parse(Goals);

    const goals = config.get("goals") || [];

    if (flags.new) {
      goals.push(flags.new);
      config.set("goals", goals);
      this.log("New writing goal set");
      return;
    }

    if (goals.length === 0) {
      this.log("No goals set");
      return;
    }

    this.log(goals.join("\n"));
    return;
  }
}
