# observe-client

CLI client for interfacing with an observatory and communicating with a firebase instance

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/observe-client.svg)](https://npmjs.org/package/observe-client)
[![CircleCI](https://circleci.com/gh/remote-observe/observe-client/tree/master.svg?style=shield)](https://circleci.com/gh/remote-observe/observe-client/tree/master)
[![Codecov](https://codecov.io/gh/remote-observe/observe-client/branch/master/graph/badge.svg)](https://codecov.io/gh/remote-observe/observe-client)
[![Downloads/week](https://img.shields.io/npm/dw/observe-client.svg)](https://npmjs.org/package/observe-client)
[![License](https://img.shields.io/npm/l/observe-client.svg)](https://github.com/remote-observe/observe-client/blob/master/package.json)

<!-- toc -->

- [observe-client](#observe-client)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g observe-client
$ observe-client COMMAND
running command...
$ observe-client (-v|--version|version)
observe-client/0.0.3 linux-x64 node-v10.14.1
$ observe-client --help [COMMAND]
USAGE
  $ observe-client COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`observe-client help [COMMAND]`](#observe-client-help-command)
- [`observe-client start`](#observe-client-start)

## `observe-client help [COMMAND]`

display help for observe-client

```
USAGE
  $ observe-client help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `observe-client start`

Start the client

```
USAGE
  $ observe-client start

OPTIONS
  -c, --config=config  Path to configuration file

DESCRIPTION
  Start the client
```

_See code: [src/commands/start.js](https://github.com/remote-observe/observe-client/blob/v0.0.3/src/commands/start.js)_

<!-- commandsstop -->
