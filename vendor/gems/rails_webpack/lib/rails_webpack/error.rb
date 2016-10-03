module RailsWebpack
  class Error < ::StandardError; end

  # Error thrown when a given asset is not found
  class AssetNotFound < Error; end
end
