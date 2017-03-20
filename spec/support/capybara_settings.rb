# frozen_string_literal: true

require 'capybara/poltergeist'

RSpec.configure do
  # Capybara settings for feature tests
  #
  Capybara.default_driver = :rack_test
  Capybara.javascript_driver = :poltergeist
end
