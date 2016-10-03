source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0.1'
# Database for Active Record
gem 'sqlite3', '~> 1.3.11'
gem 'mysql2', '~> 0.4.4'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.6.0'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
gem 'passenger', '~> 5.0.30', require: 'phusion_passenger/rack_handler'
# Whenever (cron)
gem 'whenever', '~> 0.9.4', require: false
# Bugsnag (error catcher)
gem 'bugsnag', '~> 5.0.0'

# Webpack integration
gem 'rails_webpack', path: 'vendor/gems'

# Dotenv
gem 'dotenv-rails', '~> 2.1.1'

group :development, :test do
  # RSpec
  gem 'rspec-rails', '~> 3.5.2'
  gem 'factory_girl_rails', '~> 4.7.0'
end

group :development do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 9.0.5'

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '~> 3.3.1'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring', '~> 1.7.2'
  gem 'listen', '~> 3.1.5'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Security enhancement: run bundle-audit
  gem 'bundler-audit', '~> 0.5.0', require: false
end

group :test do
  gem 'database_cleaner', '~> 1.5.3'
  gem 'capybara', '~> 2.7.1'

  gem 'selenium-webdriver', '~> 2.53.4'
end
