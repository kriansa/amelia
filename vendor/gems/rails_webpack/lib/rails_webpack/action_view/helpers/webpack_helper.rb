module RailsWebpack
  module ActionView
    module Helpers
      module WebpackHelper

        # Adds the Vue application compiled assets (JS and CSS) to this page
        #
        # The pattern in which webpack is already setup for is:
        #
        # * {app_name}.js
        # * {app_name}.css
        #
        # @param [String] app_name The name of Vue application
        #
        def frontend_app_asset_tags(app_name)
          assets = []

          assets = assets.push(content_tag(:script, '', {
            :src => path_to_webpack_asset(app_name, :js)
          }))

          if webpack_asset_exists?(app_name, :css)
            assets = assets.push(tag(:link, {
              :rel => 'stylesheet',
              :media => 'all',
              :href => path_to_webpack_asset(app_name, :css)
            }))
          end

          assets.join("\n").html_safe
        end

        private
        def path_to_webpack_asset(source, extname)

          raise ArgumentError, 'nil is not a valid asset source' if source.nil?
          raise AssetNotFound, "Asset '#{source}.#{extname}' not found!" unless webpack_asset_exists?(source, extname)

          "/assets/#{manifest["#{source}.#{extname}"]}"
        end

        def webpack_asset_exists?(source, extname)
          manifest["#{source}.#{extname}"].present?
        end

        # Fetch the manifest file in a Hash
        #
        def manifest
          if Rails.configuration.webpack.cache_manifest_file
            @cached_webpack_manifest ||= JSON.parse(File.read(Rails.root.join('public/assets/manifest.json')))
          else
            JSON.parse(File.read(Rails.root.join('public/assets/manifest.json')))
          end

        rescue Errno::ENOENT
          # Checks whether there was an error during the assets building
          if File.exists?(Rails.root.join('tmp/webpack-error.txt'))
            raise AssetCompilationFailure, 'Error while trying to compile the assets, please check webpack build logs!'
          end

          raise AssetManifestNotFound, 'Asset manifest file was not found. Please, run the asset build job!'
        end

      end
    end
  end
end
