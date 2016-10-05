module RailsWebpack
  class Error < ::StandardError; end

  # Error thrown when a given asset is not found
  class AssetNotFound < Error; end

  # Error when the asset compilation fails
  class AssetManifestNotFound < Error; end

  # Raised when your watcher is already running
  class WebpackWatcherAlreadyRunning < Error; end
end