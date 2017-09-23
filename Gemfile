# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.4.2'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.0'
# Database for Active Record
gem 'mysql2', '~> 0.4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7.0'
# Nokogiri (XML parser)
gem 'nokogiri', '~> 1.8.0'

# Bugsnag (error catcher)
gem 'bugsnag', '~> 5.3.0'
# Devise (authentication)
gem 'devise', '~> 4.3.0'

# Webpack integration
gem 'rails_webpack', path: 'vendor/gems'

# ============================
# Testing and development gems

group :development, :test do
  # RSpec
  %w[rspec-core rspec-expectations rspec-mocks rspec-rails rspec-support].each do |lib|
    gem lib, git: "https://github.com/rspec/#{lib}.git", branch: 'master'
  end

  # FactoryGirl replaces ActiveRecord's fixtures
  gem 'factory_girl_rails', '~> 4.8.0'

  # Dotenv
  gem 'dotenv-rails', '~> 2.2.0'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 9.1.0'
  gem 'pry', '~> 0.11.0'
  gem 'pry-byebug', '~> 3.5.0'

  # Web-server
  gem 'puma', '~> 3.10.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '~> 2.0.0'
  gem 'spring-commands-rspec', '~> 1.0.0'
  gem 'listen', '~> 3.1.0'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'simplecov', '~> 0.15.0', require: false

  # Functional testing
  gem 'capybara', '~> 2.15.0'
  gem 'selenium-webdriver', '~> 3.5.0'
end
