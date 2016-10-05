namespace :webpack do
  desc 'Compile webpack bundles'
  task :compile do
    ENV['NODE_ENV'] = ENV['RAILS_ENV'] || ENV['RACK_ENV'] || 'development'

    `npm run-script build`
  end

  task watch: :environment do
    # Setup logger
    logger           = Logger.new(STDOUT)
    logger.level     = Logger::INFO
    Rails.logger     = logger

    # Start watcher
    RailsWebpack::WebpackWatcher.watch
    at_exit { RailsWebpack::WebpackWatcher.unwatch }

    # take a nap
    sleep
  end
end
