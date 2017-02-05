# frozen_string_literal: true

module ApplicationHelper
  # Defines the application title
  def app_title
    'Amelia'
  end

  # Adds flash messages to the layout, depending on +flash+ variable
  def flash_messages
    output = <<~HTML
      <p class="notice">#{flash[:notice]}</p>
      <p class="alert">#{flash[:alert]}</p>
    HTML

    # rubocop:disable Rails/OutputSafety
    output.html_safe
    # rubocop:enable Rails/OutputSafety
  end
end
