# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.4.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.1'
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
# Dotenv
gem 'dotenv-rails', '~> 2.2.0'
# Devise (authentication)
gem 'devise', '~> 4.3.0'

# Webpack integration
gem 'rails_webpack', path: 'vendor/gems'

# ============================
# Testing and development gems

group :development, :test do
  # RSpec
  gem 'rspec-rails', '~> 3.6.0'
  gem 'factory_girl_rails', '~> 4.8.0'
end

group :development do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 9.0.0'
  gem 'pry', '~> 0.11.0.pre2'
  gem 'pry-byebug', '~> 3.4.0'

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '~> 3.5.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '~> 2.0.0'
  gem 'spring-commands-rspec', '~> 1.0.0'
  gem 'listen', '~> 3.1.0'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'database_cleaner', '~> 1.6.0', require: false
  gem 'simplecov', '~> 0.14.0', require: false

  # Functional testing
  gem 'capybara', '~> 2.14.0'
  gem 'poltergeist', '~> 1.15.0'
  gem 'selenium-webdriver', '~> 3.4.0'
end
