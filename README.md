# Amelia

[![CircleCI](https://img.shields.io/circleci/project/github/kriansa/amelia.svg)](https://circleci.com/gh/kriansa/amelia)
[![bitHound Dependencies](https://www.bithound.io/github/kriansa/amelia/badges/dependencies.svg)](https://www.bithound.io/github/kriansa/amelia/master/dependencies/npm)
[![Test Coverage](https://codeclimate.com/github/kriansa/amelia/badges/coverage.svg)](https://codeclimate.com/github/kriansa/amelia/coverage)
[![Inch CI](https://inch-ci.org/github/kriansa/amelia.svg?branch=master)](https://inch-ci.org/github/kriansa/amelia)
[![Code Climate](https://codeclimate.com/github/kriansa/amelia/badges/gpa.svg)](https://codeclimate.com/github/kriansa/amelia)
[![bitHound Overall Score](https://www.bithound.io/github/kriansa/amelia/badges/score.svg)](https://www.bithound.io/github/kriansa/amelia)

## Description

This is a school management tool. In the long term, it might become a base of
knowledge to help develop future applications.

### Architecture overview

It uses Rails for its backend and a flexible MPA for its frontend. Flexible
because you can use any framework you want for any of its SPA's.

The main objective is to create a totally decoupled app in the sense that
frontend and backend are totally separated things, but in the same time,
keeping as much as possible the Rails way of doing things so we don't diverge
too much.

We achive that by having a MPA (multi-page application) structure, where every
route is routed by Rails and every page has its own application, whenever
needed. It's similar to having multiple SPA applications under the same domain,
having the route as its entry-point.

## Dependencies

* Ruby (or rbenv)
* NodeJS (or nodenv)
* PhantomJS (for Poltergeist)
* MySQL

## Installation

Download this repo and ensure you have the dependencies installed. Now, run:

> `$ bin/setup`

Then it will install everything automatically for you. Once it's done, you can
run the project.

## Running the project

Because this app uses a decoupled architecture, you need to run two apps, the
backend server and the frontend assets compilation runtime.

* `$ bin/rails server` - Backend server
* `$ bin/gulp watch` - Frontend app watcher

## Philosophy

### 1. Have a high quality software
It's important that we have a good quality software that it's easy to
**maintain**, **collaborate** and **use**. [See info.](doc/quality.md)

### 2. Learning and collaboration
It's good that most of the time we are learning new stuff. Let's leverage this
product and architecture to enable us to step out of our comfort zone.

Let's join this adventure, and live on the edge, not forgetting the first rule.

### 3. Just Code™
Given the circumstances, we will the utmost to make it easy for the developer
to just code, and stop being worried about the other aspects, such as CI,
setup, etc. We'll aim to automatize most of repetitive tasks.

## Architecture
We have a few architecture decisions that we want to be guided by while
developing this application.

### Detached front-end and back-end
We want to decouple front-end from back-end so that we can live free of vendor
lock-in (or in this case - opinion lock-in). This means that while Rails
provides us a great set of good defaults, its opinionated nature (Rails Way)
sometimes gets in our way to innovate. This is one case where we want to part
ways with Rails Way. We want to have different applications that are tightly
tied together, and whenever we want, we can easily replace one or another.

### Page application isolation
With a detached application, we also want to be flexible enough not to have to
be using one framework to build the entire frontend stack. Instead, whenever
possible, we could just use jQuery, or even not use Javascript at all. We
achieve that by having one JS/CSS entry-point for every routed HTML page.

### I18n
Let's leverage Rails's I18n features to enable a multi-language software.

## Links

* [How to create a new feature](doc/creating-a-new-feature.md)
* [Release and deployment](doc/release-and-deployment.md)
* [Continuous Integration](doc/ci.md)
* [Backend architecture](doc/architecture/backend.md)
* [Frontend architecture](doc/architecture/frontend.md)

## License

BSD 3-Clause.
