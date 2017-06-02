# frozen_string_literal: true

require 'simplecov'

SimpleCov.configure do
  # Set the coverage report output path
  coverage_dir 'report/ruby/coverage'

  # Filter out bundled gems
  add_filter 'vendor/bundle'
end
