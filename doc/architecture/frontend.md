# Frontend Architecture

TODO.

## Features

* Base architecture:
  * Babel with latest JavaScript features (ES2017+)
  * VueJS
  * Lodash
* Styled by:
  * SASS
  * Bourbon
  * Bootstrap 3
* On the testing front:
  * MochaJS
  * Chai
* Checked by:
  * ESLint
  * Stylelint
* Packed by:
  * Webpack

## Filenames and locations

All frontend files should be placed on the `app/javascripts`. The subfolder in
which the source file is going to be will depend on its content:

* **actions/** - For entry points to be used on your application. Files here
  **MUST** be `.js` files. They are the files pointed by
  `frontend_app_asset_tags` appname parameter. They should be responsible for
  loading any stylesheet or global scripts to your website.
* **applications/** - For application files, such as `.vue` apps, but not
  restricted to. They can be a `.js` file full of jQuery code, for instance.
  The meaning of `application` is that it should be the smallest portion of
  your code that can still be unit-tested.
* **components/** - For ui components that are composable and reusable on 
  applications.
* **lib/** - For files that are decoupled to the project, and are reusable in
  different contexts or even applications. Eventually they could be exported
  into a npm package.
* **tests/** - This is where all tests specs should go. Every `spec` file in
  this folder should be named as `.spec.js` suffix, otherwise they will not be
  loaded by the test package.

## Testing

Testing is an extremely important step of the development process. Test file
names should be named with the suffix `.spec.js`.

Testing JS code is important because JS is a ever-changing ecosystem. Every
week you get updates on the libraries we're using, and keeping it working on
every upgrade is a must. To ensure that it won't break your app, we must be
very disciplined to write code in a testable manner.

The scope of testing code on the frontend is to make `unit` and `integration`
tests on the code written. We will not write `system` tests with JS. That's
the role of **Ruby** front.

A rule of thumb is that most files on `applications`, `components` and `lib`
should be tested. Files under `actions` folder are designed to be served to the
browser directly as an entry-point, so there may be some aspects on which their
test could be difficult (e.g. testing a page-reload), but not impossible.
Whenever one need to test an `action` code, it might be advisable to use
`JSDOM`, which is already set up in this project.

### Test folder structure

* **helpers/** - Here you will find files that are generally useful to help
you on repetitive tasks, such as, for instance, _stubbing_ a large object.
* **integration/** - There you will keep your _integration_ tests. They are
tipically tests that need to touch more than one layer of abstraction, for 
instance, network, API, time-boundaries, etc. Most of the time, you will test
`actions` code here, because they often touch different layers, such as DOM,
network, view libraries, etc. They are tipically slower than `unit` tests.
* **unit/** - There you will keep most of your tests. They are the fastest
test suite you will have, because they don't have dependencies on multiple
layers. Please, refer to the _test pyramid_ for more information about that.

### Should we separate `integration` and `unit` tests in different folders?

Yes. It's all about fast feedback. The faster that you can get feedback on a
testcase, the more reliable your suite will be, and more disciplined you
will become towards testing your code. Please, read more about that on this
[great article](https://lukasatkinson.de/2017/should-i-separate-unit-tests-from-integration-tests/).

### Testing frameworks

We use [MochaJS](https://mochajs.org/) as our main test-framework. We also use
[chai](http://chaijs.com/) as our assertion library, in `expect` mode. 

For testing doubles, we use a library called [SinonJS](http://sinonjs.org/), so
refer to it when using `spies`, `mocks` and `stubs`.

Because `Sinon` provides us its own assertions, we'd love not to mess with our
defaults, provided by `chai`. So we also use an integration library called
[Sinon-Chai](https://github.com/domenic/sinon-chai) to provides us a few useful
assertions in order to keep consistency with `chai`.

## Style Guides

* [BEM](http://getbem.com/) for CSS naming convention
* [Airbnb JS Styleguide](https://github.com/airbnb/javascript/)
* [Stylelint config standard](https://github.com/stylelint/stylelint-config-standard)
