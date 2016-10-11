# frozen_string_literal: true

namespace :webpack do
  desc 'Compile webpack bundles'
  task :compile do
    ENV['NODE_ENV'] = ENV['RAILS_ENV'] || ENV['RACK_ENV'] || 'development'

    `npm run-script build`
  end
end
