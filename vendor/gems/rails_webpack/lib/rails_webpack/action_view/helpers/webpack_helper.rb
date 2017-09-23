# frozen_string_literal: true

module RailsWebpack
  module ActionView
    module Helpers

      # View helper that adds methods that translates
      # webpack-compiled files into the Rails views
      #
      module WebpackHelper

        # Adds the application compiled assets (js and css) to this page
        #
        # The pattern in which webpack is already setup for is:
        #
        # * {app_name}.js
        # * {app_name}.css
        #
        # @param [String] app_name The name of application
        # @return [String]
        def frontend_app_asset_tags(app_name = nil)
          assets = []

          app_name ||= "#{params[:controller]}/#{params[:action]}"

          assets = assets.push(webpack_script_tag(app_name)) if webpack_asset_exists?("#{app_name}.js")
          assets = assets.push(webpack_stylesheet_tag(app_name)) if webpack_asset_exists?("#{app_name}.css")

          assets.join("\n").html_safe # rubocop:disable Rails/OutputSafety
        end

        # Returns the script tag pointing to the webpack-compiled script
        #
        def webpack_script_tag(source)
          content_tag(:script, '', src: path_to_webpack_asset("#{source}.js"))
        end

        # Returns the link tag pointing to the webpack-compiled css
        #
        def webpack_stylesheet_tag(source)
          tag(
            :link,
            rel: 'stylesheet',
            media: 'all',
            href: path_to_webpack_asset("#{source}.css")
          )
        end

        private

        # Retrieves the webpack-compiled asset
        #
        # E.g.: index.js => /assets/index-6389243j43g423483.js
        #
        def path_to_webpack_asset(source)
          raise ArgumentError, 'nil is not a valid asset source' unless source
          raise AssetNotFound, "Asset '#{source}' not found!" unless webpack_asset_exists?(source)

          config = Rails.configuration

          "#{config.relative_url_root}#{config.webpack.assets_prefix}/#{manifest[source]}"
        end

        # Checks whether a given webpack asset exists or not
        #
        def webpack_asset_exists?(source)
          manifest[source].present?
        end

        # Fetch the manifest file in a Hash
        #
        def manifest
          # TODO: Think about a way to cache this file using: Rails.configuration.webpack.cache_manifest_file
          JSON.parse(File.read(Rails.configuration.webpack.manifest_file_path))
        rescue Errno::ENOENT
          # Checks whether there was an error during the assets building
          if File.exist?(Rails.configuration.webpack.error_file_path)
            raise AssetCompilationFailure, 'Error while trying to compile the assets, please check webpack build logs!'
          end

          raise AssetManifestNotFound, 'Asset manifest file was not found. Please, run the asset build job!'
        end
      end
    end
  end
end
