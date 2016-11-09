# frozen_string_literal: true

namespace :assets do
  desc 'Compile webpack bundles'
  task :precompile do
    system('bin/gulp compile')
  end
end
