require 'rails'
require 'rails/railtie'

module RailsWebpack
  class Railtie < ::Rails::Railtie

    initializer 'rails_webpack.load_helper' do
      ActiveSupport.on_load(:action_view) do
        include RailsWebpack::ActionView::Helpers::WebpackHelper
      end
    end

    config.webpack = ActiveSupport::OrderedOptions.new

    # Define whether we should cache the manifest file (useful in production)
    config.webpack.cache_manifest_file = true

    rake_tasks do
      load "tasks/webpack.rake"
    end
  end
end
