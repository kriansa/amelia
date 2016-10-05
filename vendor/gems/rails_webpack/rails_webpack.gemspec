require File.expand_path('../lib/rails_webpack/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'rails_webpack'
  s.version     = RailsWebpack::VERSION
  s.authors     = ['Daniel Pereira']
  s.homepage    = 'https://garajau.com.br/'
  s.summary     = 'Webpack integration for Rails'
  s.license     = 'Nonstandard'

  # Runtime dependencies
  s.add_runtime_dependency "rails", "~> 5"
  s.add_runtime_dependency "listen", "~> 3"
end
