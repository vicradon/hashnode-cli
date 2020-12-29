# hashnode-cli

Command line untilities for interacting with Hashnode and managing a Hashnode blog.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/hashnode-cli.svg)](https://npmjs.org/package/hashnode-cli)
[![Downloads/week](https://img.shields.io/npm/dw/hashnode-cli.svg)](https://npmjs.org/package/hashnode-cli)
[![License](https://img.shields.io/npm/l/hashnode-cli.svg)](https://github.com/vicradon/hashnode-cli/blob/master/package.json)

<!-- toc -->
* [hashnode-cli](#hashnode-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g hashnode-cli
$ hashnode-cli COMMAND
running command...
$ hashnode-cli (-v|--version|version)
hashnode-cli/1.0.0 linux-x64 node-v10.19.0
$ hashnode-cli --help [COMMAND]
USAGE
  $ hashnode-cli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`hashnode-cli create-post`](#hashnode-cli-create-post)
* [`hashnode-cli goals`](#hashnode-cli-goals)
* [`hashnode-cli help [COMMAND]`](#hashnode-cli-help-command)
* [`hashnode-cli login`](#hashnode-cli-login)
* [`hashnode-cli remove [FILE]`](#hashnode-cli-remove-file)

## `hashnode-cli create-post`

Creates a post on your hashnode blog from a markdown file.

```
USAGE
  $ hashnode-cli create-post

OPTIONS
  -h, --help         show CLI help
  -t, --title=title  post title
```

_See code: [src/commands/create-post.ts](https://github.com/vicradon/hashnode-cli/blob/v1.0.0/src/commands/create-post.ts)_

## `hashnode-cli goals`

Set your writing goals or retreive them

```
USAGE
  $ hashnode-cli goals

OPTIONS
  -h, --help     show CLI help
  -n, --new=new  set a new writing goal
```

_See code: [src/commands/goals.ts](https://github.com/vicradon/hashnode-cli/blob/v1.0.0/src/commands/goals.ts)_

## `hashnode-cli help [COMMAND]`

display help for hashnode-cli

```
USAGE
  $ hashnode-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `hashnode-cli login`

authenticate using the oauth methods provided

```
USAGE
  $ hashnode-cli login

OPTIONS
  -h, --help         show CLI help
  -t, --token=token  Hashnode token from the developer settings
```

_See code: [src/commands/login.ts](https://github.com/vicradon/hashnode-cli/blob/v1.0.0/src/commands/login.ts)_

## `hashnode-cli remove [FILE]`

describe the command here

```
USAGE
  $ hashnode-cli remove [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/remove.ts](https://github.com/vicradon/hashnode-cli/blob/v1.0.0/src/commands/remove.ts)_
<!-- commandsstop -->
