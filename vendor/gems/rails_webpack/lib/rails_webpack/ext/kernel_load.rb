# frozen_string_literal: true
#
# This patches Kernel#load to disable loading Rails's yarn.rake task
# Rails yarn task uses a very obtrusive way of hooking into a defined task by
# injecting itself into assets:precompile task. There is no other way to block
# it, other than making this ugly monkeypatch on the load method.
#
# If that comforts you, this should only be loaded when the tasks are required,
# tipically when running a rake task.
module Kernel
  alias_method :original_load, :load

  def load(filename, wrap = false)
    if filename == 'rails/tasks/yarn.rake'
      # Undo-me
      Kernel.send(:undef_method, :load)
      Kernel.send(:alias_method, :load, :original_load)
      Kernel.send(:undef_method, :original_load)

      # Pretend it's loaded
      return
    end

    original_load(filename, wrap)
  end
end
