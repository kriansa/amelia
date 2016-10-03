require 'rails'
require 'rails/railtie'

module RailsWebpack
  class Railtie < ::Rails::Railtie
    config.after_initialize do
      ActiveSupport.on_load(:action_view) do
        include RailsWebpack::ActionView::Helpers::WebpackHelper
      end
    end

    # TODO: Use config.webpack
    # config.webpack = ActiveSupport::OrderedOptions.new

    rake_tasks do
      load "tasks/webpack.rake"
    end
  end
end
