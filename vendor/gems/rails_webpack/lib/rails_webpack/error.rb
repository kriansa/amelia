# frozen_string_literal: true

module RailsWebpack
  # Base error class for this lib
  class Error < ::StandardError; end

  # Error thrown when a given asset is not found
  class AssetNotFound < Error; end

  # Error when the asset compilation fails
  class AssetManifestNotFound < Error; end

  # Error when trying to fetch assets with compilation failure
  class AssetCompilationFailure < Error; end
end
