# frozen_string_literal: true

require 'factory_girl'
require 'database_cleaner'

RSpec.configure do |config|
  config.include Warden::Test::Helpers
  config.before :suite do
    # Configure warden to work in test mode
    Warden.test_mode!
  end

  # Use FactoryGirl helper methods
  #
  config.include FactoryGirl::Syntax::Methods

  # Capybara settings
  #
  Capybara.asset_host = 'http://localhost:3000'

  # TODO: In a near future, start working with Capybara-Webkit
  # Configure Capybara-Webkit
  #
  # Capybara.javascript_driver = :webkit
  # Capybara::Webkit.configure do |config|
  #   config.allow_url("fonts.googleapis.com")
  # end

  # Configure DatabaseCleaner
  #
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    # :rack_test driver's Rack app under test shares database connection
    # with the specs, so continue to use transaction strategy for speed.
    driver_shares_db_connection_with_specs = Capybara.current_driver == :rack_test

    unless driver_shares_db_connection_with_specs
      # Driver is probably for an external browser with an app
      # under test that does *not* share a database connection with the
      # specs, so use truncation strategy.
      DatabaseCleaner.strategy = :truncation
    end
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.append_after(:each) do
    DatabaseCleaner.clean
  end
end
