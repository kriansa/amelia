# frozen_string_literal: true

namespace :webpack do
  desc 'Compile webpack bundles'
  task :compile do
    system('bin/gulp compile')
  end
end

# Add this task as a dependency to assets:precompile
if Rake::Task.task_defined?('assets:precompile')
  Rake::Task['assets:precompile'].enhance(['webpack:compile'])
end
