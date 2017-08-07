# CI

Our CI server (CircleCI) will be responsible for running our build everytime we push something to one of the following branches:

- master
- staging
- feature/*
- hotfix/*
- release/*

This will be done for pull-requests as well.

## Build process

Our build process can be reproduced on the development environment as well:

> `$ bin/test`

This is actually recommended to be setup as a git pre-commit hook.

## Environment variables

When setting up a new CI server, it's important to setup the following variables:

* `CODECLIMATE_REPO_TOKEN` - The token used to upload the test results to CodeClimate service.
* `RACK_ENV` - **Value**: `ci`
* `NODE_ENV` - **Value**: `test`
* `BUNDLE_WITHOUT` - **Value**: `development`
* `HEROKU_APP_NAME` - This is currently tied to CircleCI vendor (see `circle.yml`) to assign the Heroku application name to be deployed to.
