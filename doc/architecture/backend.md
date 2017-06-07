# Backend Architecture

## Gemfile-detached 

Bundler is a great tool, but because it's suited for having
a subset of libraries working together, it doesn't provide a good support for
having binary programs dependency tracking.

This works perfectly for application library dependencies, where you don't want
to have conflict among your dependencies.

To illustrate what I'm trying to accomplish, let's see some code examples.

Imagine the following `Gemfile`:

```ruby 
source 'https://rubygems.org' gem 'rails', '5.1' gem 'rails', '3.2'
```

It will definitely be invalid, right? This is considered a conflict, since you
can't have two dependencies in different versions in the same application,
otherwise what would happen if you tried to `require 'rails'` on your app?
Bundler takes care of that gracefully.

But what happens when you actually want such thing? What if I want different
versions of Rails installed on my system, so I could create apps in different
versions? Well, that is perfectly possible today - you just have to install
them manually:

```sh 
gem install rails -v 5.1 gem install rails -v 3.2
```

How come we don't have such management tool for that? One would argue that it's
easy to just have a plain bash script that install all these non-library
dependencies by hand. We chose to have a `Gemfile-detached` to do that. It's
not perfect, but it's easier (for now) than having a plain bash script, because
we can still leverage some of Bundler capabilities, such as `bundle outdated`.

Let me clear things out. Having this file doesn't support automatically two
versions of the same library on our system. It does, however, makes harder to
have dependency conflicts on our application. One classic example is that
`mailcatcher` has a webserver integrated, using sinatra and some old libraries.
When you add it to `Gemfile`, it will most certainly add many conflicts, due
the fact that Rails will require different versions of Rack, for instance. So
having it as a dependency, but on a different `Gemfile` will decrease the
chances of that.

So, what gems should be added to `Gemfile-detached` instead of normal
`Gemfile`? Basically, every gem that you won't use as a library - i.e. you
won't `require` them in your code. Gems such as `mailcatcher` or `passenger`
that you run as an external application and are not directly included on your
code.

## Entity Relationship Model (ERM)

You can access it [here](../tables.md)

## Rails startup settings

Rails provides a few settings to be set on runtime, you just need to provide
these environment variables to configure them:

* `RAILS_SERVE_STATIC_FILES` - Enable serving assets on folder `/public`
* `RAILS_LOG_TO_STDOUT` - Enable logging to stdout
* `RAILS_RELATIVE_URL_ROOT` - Enables deploying rails in a subfolder
* `RAILS_ENABLE_DEV_CACHING` - On development environment, enable controller
  caching (default is true only for production).
