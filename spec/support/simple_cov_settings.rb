# frozen_string_literal: true

require 'simplecov'

SimpleCov.configure do
  # Set the coverage report output path
  coverage_dir 'report/ruby/coverage'

  # Filter out bundled gems
  add_filter 'vendor/bundle'
end

# When using CodeCov, let's invoke it and upload the coverage report
if ENV.key?('CODECOV_TOKEN')
  require 'codecov'

  SimpleCov.formatters = SimpleCov::Formatter::MultiFormatter.new([
    SimpleCov::Formatter::Codecov,
    SimpleCov::Formatter::HTMLFormatter
  ])
end
