# frozen_string_literal: true

require 'factory_girl'

RSpec.configure do |config|
  # Include Warden test helpers to test Authentication
  #
  config.include Warden::Test::Helpers
  config.before :suite do
    # Configure warden to work in test mode
    Warden.test_mode!
  end

  # Use FactoryGirl helper methods
  #
  config.include FactoryGirl::Syntax::Methods
end
