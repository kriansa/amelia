require File.expand_path('../lib/rails_webpack/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'rails_webpack'
  s.version     = RailsWebpack::VERSION
  s.authors     = ['Daniel Pereira']
  s.homepage    = 'https://garajau.com.br/'
  s.summary     = 'Webpack integration for Rails'
  s.license     = 'Nonstandard'

  # Gem files
  # s.files       = %w(
  #   lib/rails_webpack.rb
  #   lib/rails_webpack/version.rb
  # )

  # Runtime dependencies
  s.add_runtime_dependency "rails", "~> 5"

  # Development dependencies
  s.add_development_dependency "rspec", "~> 3.5"
end
