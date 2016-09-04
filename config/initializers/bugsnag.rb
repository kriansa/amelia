Bugsnag.configure do |config|
  config.api_key = ENV['BUGSNAG_KEY']
  config.notify_release_stages = %w(staging production)
  config.send_environment = true
end
