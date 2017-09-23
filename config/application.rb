# frozen_string_literal: true

require_relative 'boot'

require "rails"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "action_mailer/railtie"
require "rails/test_unit/railtie"
require "sprockets/railtie"

# Disabled for now
# require "active_job/railtie"
# require "action_cable/engine"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Amelia
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Code is not reloaded between requests.
    config.cache_classes = true

    # Eager load code on boot. This eager loads most of Rails and
    # your application in memory, allowing both threaded web servers
    # and those relying on copy on write to perform better.
    # Rake tasks automatically ignore this option for performance.
    config.eager_load = true

    # Full error reports are disabled and caching is turned on.
    config.consider_all_requests_local       = false
    config.action_controller.perform_caching = true

    # Attempt to read encrypted secrets from `config/secrets.yml.enc`.
    # Requires an encryption key in `ENV["RAILS_MASTER_KEY"]` or
    # `config/secrets.yml.key`.
    config.read_encrypted_secrets = false

    # Disable serving static files from the `/public` folder by default since
    # Apache or NGINX already handles this.
    config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present?

    # Specifies the header that your server uses for sending files.
    # config.action_dispatch.x_sendfile_header = 'X-Sendfile' # for Apache
    # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for NGINX

    # Mount Action Cable outside main process or domain
    # config.action_cable.mount_path = nil
    # config.action_cable.url = 'wss://example.com/cable'
    # config.action_cable.allowed_request_origins = [ 'http://example.com', /http:\/\/example.*/ ]

    # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
    # config.force_ssl = true

    # Use the lowest log level to ensure availability of diagnostic information
    # when problems arise.
    config.log_level = :debug

    # Prepend all log lines with the following tags.
    config.log_tags = [ :request_id ]

    # Use a different cache store in production.
    # config.cache_store = :mem_cache_store

    # Use a real queuing backend for Active Job (and separate queues per environment)
    # config.active_job.queue_adapter     = :resque
    # config.active_job.queue_name_prefix = "amelia_#{Rails.env}"
    config.action_mailer.perform_caching = false

    # Ignore bad email addresses and do not raise email delivery errors.
    # Set this to true and configure the email server for immediate delivery to raise delivery errors.
    config.action_mailer.raise_delivery_errors = true

    # Raises error for missing translations
    config.action_view.raise_on_missing_translations = true

    # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
    # the I18n.default_locale when a translation cannot be found).
    config.i18n.fallbacks = [:en]

    # Send deprecation notices to registered listeners.
    config.active_support.deprecation = :notify

    # Use default logging formatter so that PID and timestamp are not suppressed.
    config.log_formatter = ::Logger::Formatter.new

    # Use a different logger for distributed setups.
    # require 'syslog/logger'
    # config.logger = ActiveSupport::TaggedLogging.new(Syslog::Logger.new 'app-name')

    if ENV["RAILS_LOG_TO_STDOUT"].present?
      logger           = ActiveSupport::Logger.new(STDOUT)
      logger.formatter = config.log_formatter
      config.logger    = ActiveSupport::TaggedLogging.new(logger)
    end

    # Do not dump schema after migrations.
    config.active_record.dump_schema_after_migration = false

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Brasilia'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = 'pt-BR'

    # Enable per-form CSRF tokens. Previous versions had false.
    config.action_controller.per_form_csrf_tokens = true

    # Enable origin-checking CSRF mitigation. Previous versions had false.
    config.action_controller.forgery_protection_origin_check = true

    # Require `belongs_to` associations by default. Previous versions had false.
    config.active_record.belongs_to_required_by_default = true

    # Configure SSL options to enable HSTS with subdomains. Previous versions had false.
    config.ssl_options = { hsts: { subdomains: true } }

    # Make Ruby 2.4 preserve the timezone of the receiver when calling `to_time`.
    # Previous versions had false.
    ActiveSupport.to_time_preserves_timezone = true

    # Make `form_with` generate non-remote forms.
    config.action_view.form_with_generates_remote_forms = false

    # Allow us to change the default generators
    config.generators do |gen|
      gen.stylesheets       false
      gen.javascripts       false
      gen.helper            false
      gen.jbuilder          true
      gen.template_engine   :erb

      # Setup defaults for ActiveRecord
      gen.orm               :active_record
      gen.active_record     migration: true,
                            timestamps: true,
                            indexes: true,
                            parent: 'ApplicationRecord'

      # RSpec is still not compatible with system tests generation, so we'll
      # disable it for now.
      gen.system_tests      false

      # Setup defaults for RSpec
      gen.test_framework    :rspec,
                            fixture: true,
                            fixture_replacement: :factory_girl,
                            integration_tool: :rspec,
                            view_specs: false,
                            helper_specs: true,
                            controller_specs: true,
                            routing_specs: true
    end

    # Mailer settings
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address: ENV['SMTP_ADDRESS'],
      port: ENV['SMTP_PORT'],
      user_name: ENV['SMTP_USERNAME'],
      domain: ENV['SMTP_DOMAIN'],
      password: ENV['SMTP_PASSWORD'],
      authentication: ENV['SMTP_AUTHENTICATION'],
    }

    # Base URI
    uri = URI(ENV['BASE_URL'])
    uri_hash = { host: uri.host, protocol: uri.scheme, port: uri.port }

    # Email URLs
    config.action_mailer.default_url_options = uri_hash

    # Default URL
    routes.default_url_options = uri_hash

    # what else?
    config.action_mailer.asset_host = ENV['ASSETS_URL'] || ENV['BASE_URL']
    config.action_controller.asset_host = ENV['ASSETS_URL'] || ENV['BASE_URL']

    # Assets settings

    # Enables Sprockets compile environment. If disabled,
    # Rails.application.assets will be nil to prevent inadvertent compilation
    # calls. View helpers will depend on assets being precompiled to
    # public/assets in order to link to them.  Initializers expecting
    # Rails.application.assets during boot should be accessing the environment
    # in a config.assets.configure block.
    config.assets.compile = true

    # Version of your assets, change this if you want to expire all your
    # assets.
    config.assets.version = '1.0'

    # Add additional assets to the asset load path.
    # Rails.application.config.assets.paths << Emoji.images_path Rails includes
    # app/assets, lib/assets and vendor/assets for you already.  Plugins might
    # want to add their custom paths to this.  config.assets.paths <<
    # Rails.root.join('node_modules')

    # Precompile additional assets.  application.js, application.css, and all
    # non-JS/CSS in the app/assets folder are already added.
    # config.assets.precompile += %w( admin.js admin.css )

    # When set to a truthy value, a result will be returned even if the
    # requested asset is not found in the asset pipeline. When set to a falsey
    # value it will raise an error when no asset is found in the pipeline.
    config.assets.unknown_asset_fallback = false

    # Changes the directory to compile assets to.
    config.assets.prefix = "/assets"

    # Suppresses logger output for asset requests. Uses the
    # config.assets.prefix path to match asset requests.
    config.assets.quiet = false

    # Enable expanded asset debugging mode. Individual files will be served to
    # make referencing filenames in the web console easier. This feature will
    # eventually be deprecated and replaced by Source Maps in Sprockets 3.x.
    config.assets.debug = false

    # When enabled, fingerprints will be added to asset filenames.
    config.assets.digest = true

    # Set a limit for cache
    config.assets.cache_limit = 50.megabytes

    # GZIP the output
    config.assets.gzip = true

    # When enabled, an exception is raised for missing assets.
    config.assets.check_precompiled_asset = true

    # A list of :environment and :manifest symbols that defines the order that
    # we try to find assets: manifest first, environment second?  Manifest
    # only?
    #
    # By default, we check the manifest first if asset digests are enabled and
    # debug is not enabled, then we check the environment if compiling is
    # enabled.
    config.assets.resolve_with = %i[manifest]
  end
end
