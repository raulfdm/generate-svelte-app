# Generate Svelte App

> Quick way to start your Svelte app

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/generate-svelte-app.svg)](https://npmjs.org/package/generate-svelte-app)
[![Downloads/week](https://img.shields.io/npm/dw/generate-svelte-app.svg)](https://npmjs.org/package/generate-svelte-app)
[![License](https://img.shields.io/npm/l/generate-svelte-app.svg)](https://github.com/raulfdm/generate-svelte-app/blob/master/package.json)

# Why

The only reason this CLI exists is the fact Svelte still does not have some easy way to get started with a project like `create-react-app`, `vue-cli` or `angular-cli`.

Officially they have [this tutorial](https://svelte.dev/blog/the-easiest-way-to-get-started), which suggests using `degit` to fetch a svelte template but IMO it's still a lot of work to do.

Another thing is in this specific template their are using `sirv-cli` which for some reason has some weird bug when you start the project.

In a nutshell, this CLI is using their template with some small changes in the server to proper run locally and also starts your project running one command.

# Usage

First you have to install the CLI globally:

```bash
yarn global add generate-svelte-app
# Or if you're using Npm
# npm install generate-svelte-app --global
```

Then, you can call the CLI passing your project name:

```bash
generate-svelte-app -n my-awesome-project
```

It'll automatically create your project with the basic svelte files. All you need to do is start your app:

```bash
cd my-awesome-project
yarn start
```

# Commands

| Command | Alias | Description       | Default |
| ------- | ----- | ----------------- | ------- |
| --name  | -n    | Your project name |         |
| --npm   |       | Set to use npm    | yarn    |

# License

[MIT](./LICENSE.md)
