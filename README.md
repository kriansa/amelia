# Amelia

[![CircleCI](https://circleci.com/gh/kriansa/amelia.svg?style=svg)](https://circleci.com/gh/kriansa/amelia)
[![Code Climate](https://codeclimate.com/github/kriansa/amelia/badges/gpa.svg)](https://codeclimate.com/github/kriansa/amelia)
[![Test Coverage](https://codeclimate.com/github/kriansa/amelia/badges/coverage.svg)](https://codeclimate.com/github/kriansa/amelia/coverage)
[![Dev Dependency Status](https://david-dm.org/kriansa/amelia/status.svg)](https://david-dm.org/kriansa/amelia#info=dependencies&view=list)
[![Inch CI](https://inch-ci.org/github/kriansa/amelia.svg?branch=master)](https://inch-ci.org/github/kriansa/amelia)

## Description

## Getting Started

### How to create a new feature

## Goals

#### Have a high quality software
#### Learn while develop
#### Just Code™

## Rationale

### Gemfile-detached

### Code conventions

* Ruby
  * Rubocop
  * Reek
* JS
  * ESLint
* SCSS/CSS
  * Stylelint

### CodeClimate

### CircleCI

## Architecture

#### Entity Relationship Model (ERM)

You can access it [here](doc/tables.md)

#### Detached front-end and back-end
#### Event sourcing architecture
#### I18n
#### Dependency inversion
#### Page application isolation

## Development

#### Document-driven development
#### Test-driven development

#### Pre-commit hook

I suggest that you use the command `bin/test` on your pre-commit hook, so that you can check the code quality before commiting.

## Startup settings

Rails provides a few settings to be set on runtime, you just need to provide these environment varialbes to configure them:

* RAILS_SERVE_STATIC_FILES - Enable serving assets on folder `/public`
* RAILS_LOG_TO_STDOUT - Enable logging to stdout
* RAILS_RELATIVE_URL_ROOT - Enables deploying rails in a subfolder
* RAILS_ENABLE_DEV_CACHING - On development environment, enable controller caching (default is true only for production).

## Release/Deployment

## Dependencies

* Ruby
* NodeJS
* PhantomJS (for Poltergeist)

#### Continuous Integration / Deployment

## Other libs

* https://github.com/elabs/pundit
