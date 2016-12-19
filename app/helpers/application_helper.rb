# frozen_string_literal: true

module ApplicationHelper
  def app_title
    "Amelia"
  end

  def flash_messages
    <<~HTML
      <p class="notice">#{flash[:notice]}</p>
      <p class="alert">#{flash[:alert]}</p>
    HTML
  end

end
