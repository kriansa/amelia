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

    # Define which folders the webpack watcher should watch for changes
    config.webpack.watch_paths = []

    rake_tasks do
      load "tasks/webpack.rake"
    end
  end
end
