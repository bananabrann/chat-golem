# Discord Chat Golem

Discord chat bot for the Tyrian Monster Hunter League guild in Guild Wars 2.

## Requirements

This application does not compile into executable binaries. As such, both the local _and_ production machines need the following requirements:

- Node 16 latest
- NPM 7

> Other dependencies, such as webpack and TypeScript, are handled by the package and do not need global installation on your system.
> This guide will also assume all environments are on a Linux machine (or container/WSL), specifically Ubuntu.

# Installation

1. Clone repo.
1. Install.
1. **Populate your .env files!**
1. Start.

```sh
$ git clone https://github.com/bananabrann/chat-golem.git
# Authorized contributors should use SSH authority.

$ cd chat-golem && \
  npm i

$ mv .example.env .env
```

Once installed and environment variables populated, start the application simply by:

```sh
$ npm start
```

## Deploying and Installation for Production

This project uses a combination of running on bananabrann's computer and a nightly Azure virtual machine (VM), depending on the time of day. In the future, and if the bot is ussed frequently, CI/CD pipelines will be configured to deploy the prod branch to the VM.

### Fresh Setup and Installation

> Readme is a work in progress.

### Updating Existing Infrastructure

> Readme is a work in progress.

# Contributing

Wow, thanks for your interest! All contributions, no matter how big or small, are super appreciated. Please see the [contribution guide](./CONTRIBUTING.md) for more info.
