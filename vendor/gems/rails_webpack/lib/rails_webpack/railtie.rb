# frozen_string_literal: true

require 'rails'
require 'rails/railtie'

module RailsWebpack

  # This is the entry point of the plugin
  class Railtie < ::Rails::Railtie
    initializer 'rails_webpack.load_helper' do
      ActiveSupport.on_load(:action_view) do
        include RailsWebpack::ActionView::Helpers::WebpackHelper
      end
    end

    config.webpack = ActiveSupport::OrderedOptions.new

    # Define whether we should cache the manifest file (useful in production)
    config.webpack.cache_manifest_file = true

    # Set the default base path to serve assets from. This path will be
    # appended to Rails's `config.relative_url_root`. No trailing slash.
    #
    # The default value is 'assets', due Rails's public_file_server ability
    # to serve any assets under public folder. However, you may want to change
    # this value in production if you use a different web-server that fetch
    # files from a different path
    #
    # If you use Sprockets, this setting should be set to the same value as
    # `config.assets.prefix` for consistency.
    config.webpack.assets_prefix = '/assets'

    # It's not advised to have Rails asset pipeline enabled along with
    # Rails-Webpack.  That's why this gem will set the asset precompile array
    # to a blank value so that no asset is ever compiled using Sprockets.
    #
    # However, in many circumstances, you may want to enable it for static
    # assets, such as images or fonts that you want to serve through your
    # application. They will also be available for usage with helpers like
    # `image_path`, `font_path` and others.
    #
    # Tip: this is useful to be used on emails. If you're not using emails,
    # then turning this option off is perfectly safe
    config.webpack.enable_static_asset_pipeline = true

    # Select the paths you want to include for the static asset pipeline. All files on
    # those folders will be compiled regardless of their extension.
    config.webpack.selective_static_pipeline = ['app/assets/images']

    # This block is required in order to override Sprockets settings
    config.after_initialize do |app|
      next if !config.respond_to?(:assets) || !config.webpack.enable_static_asset_pipeline

      # Ensure our asset pipeline has only the selected source paths
      app.config.assets.paths = config.webpack.selective_static_pipeline

      # Overwrite Sprockets configuration after Rails initialization
      # because they become frozen at that point
      app.assets = Sprockets::Railtie.build_environment(app, true)
      app.assets_manifest = Sprockets::Railtie.build_manifest(app)
    end

    # Load Webpack compilation tasks
    rake_tasks do
      require_relative 'ext/kernel_load'
      load 'tasks/webpack.rake'
    end
  end
end
