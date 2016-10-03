module RailsWebpack
  module ActionView
    module Helpers
      module WebpackHelper

        def application_link_tags(app_name)
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

          raise ArgumentError, "nil is not a valid asset source" if source.nil?
          raise AssetNotFound, "Asset '#{source}.#{extname}' not found!" unless webpack_asset_exists?(source, extname)

          "/assets/#{manifest["#{source}.#{extname}"]}"
        end

        def webpack_asset_exists?(source, extname)
          manifest["#{source}.#{extname}"].present?
        end

        def manifest
          JSON.parse(File.read(Rails.root.join('public/assets/manifest.json')))
        end

      end
    end
  end
end
