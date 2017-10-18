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

## Database

Because we use a relational database, it's important that we leverage the ACID
features on it. It means that although it's nice that Rails support many 
validations built-in, we need to enforce that at a database level. In practice,
when creating and editing models, keep in mind the following:

* Always create a `unique` index for `uniqueness` validator;
* Always create a `unique` index for a `has_one` related table;
* Always create a `not null` constraint for a `presence` validator;
* Always create a `foreign key` constraing for a table connected to another 
  through a `belongs_to`, `has_many` or a `has_one` relation. Keep in mind to
  do it on `has_one :through` join tables as well.

Such validations should be done automatically through some tools such as
[consistency fail](https://github.com/trptcolin/consistency_fail) and
[nullalign](https://github.com/tcopeland/nullalign). In the meantime, we need
to double-check our ERM in order to avoid issues such as [race-conditions and
inconsistencies](https://8thlight.com/blog/colin-jones/2011/06/10/winning-at-consistency.html)
on our database.

## Rails startup settings

Rails provides a few settings to be set on runtime, you just need to provide
these environment variables to configure them:

* `RAILS_SERVE_STATIC_FILES` - Enable serving assets on folder `/public`
* `RAILS_LOG_TO_STDOUT` - Enable logging to stdout
* `RAILS_RELATIVE_URL_ROOT` - Enables deploying rails in a subfolder
* `RAILS_ENABLE_DEV_CACHING` - On development environment, enable controller
  caching (default is true only for production).
