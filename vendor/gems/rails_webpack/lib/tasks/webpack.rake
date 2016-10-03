namespace :webpack do
  desc 'Compile webpack bundles'
  task compile: :environment do
    ENV['NODE_ENV'] = Rails.env

    `npm run-script build`
  end
end
