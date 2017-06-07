# Quality

We aim to have a high-quality software. We do so by having the following
guidelines.

## Code conventions

We want to ensure that we code in a way that is widely encouraged by the
community, so we enabled our linters to follow the following guides:

* Ruby
  * [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide)
  * [Reek Code Smells](https://github.com/troessner/reek/blob/master/docs/Code-Smells.md)
* JS
  * [Airbnb Javascript style guide](https://github.com/airbnb/javascript)
* SCSS/CSS
  * [Stylelint config standard](https://github.com/stylelint/stylelint-config-standard)

[Check here](conventions.md) for more information on our code conventions.

## Linting

Linters are available for both Ruby and Javascript/CSS code. We're using
Rubocop for Ruby code, Stylelint for CSS/SASS code and ESLint for JS. Ensure
that you enable this feature for your editor so you can benefit from real-time
linting while coding.

However, if for some reason you can't enable linting, you can run them manually
by:

* `bin/rubocop` - Ruby linter
* `bin/gulp lint` - Frontend (JS, CSS) linter

## Testing

There's no doubt that testing are the most important piece of the software to
ensure its parity with the specs. That's why we allow the developers to have
testing on both frontend and backend from day zero.

We aim to achieve close to 100% of code-coverage. We know that it's hard, but
let's aim high and not drop that ball.

### Running the tests

#### `$ bin/gulp test` This is what you will often be using while developing
frontend code. It will spin up a Karma runner with the full JS suite.

#### `$ bin/rspec` This is the command you should be using while developing
backend code. For more commands, refer to [RSpec](http://rspec.info/) manual.

#### `$ bin/test`

This will run a full system test batch, including code coverage and then
generate some reports on the **reports** folder. It might be useful to look at
them by opening the `reports/index.html` file on your browser.

Beware that this command might be slow, and it's recommended to run it on a CI
job or on a **pre-commit hook** to ensure code-quality before pushing.

## CodeClimate

We use CodeClimate service to help us tracking the overall quality of our app.
Internally, CodeClimate uses code coverage reports, test results, linters and
some other tools to give us a score and spot stuff that we may have missed and
we need to fix.

You can see the report [here](https://codeclimate.com/github/kriansa/amelia).

## Continuous integration

It's mandatory that we have all this enabled, but overtime it might become a
PITA to have to run all of the build process everytime we need to deploy
manually. Let's take _manually_ off our vocabulary here, and use a CI service
to make our deployments faster and less prone to human errors.

We adopted CircleCI as our tool. The usage is [described here](ci.md).

## Living on the edge

It's difficult to manage old software. The more we stay behind updates, the
higher are chances that we have security issues and fall behind outdated
features.

That's why we encourage you to take a step further and live on the edge, by
using the most updated version of every software.

A quick way to get all packages we're using and check their versions is by:

#### `$ bin/check-outdated-packages`

It should help you on finding out the most updated libraries for both frontend
and backend software.
