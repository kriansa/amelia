class HomeController < ApplicationController
  def healthcheck
    head :ok, content_type: 'text/html', layout: false
  end

  def index
  end
end
