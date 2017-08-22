# frozen_string_literal: true

Rails.application.routes.draw do
  resources :people
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#healthcheck', via: :head, as: 'healthcheck'
  root to: 'home#index'

  # Devise routes
  devise_for :users, controllers: {
    # confirmations: 'users/confirmations',
    # omniauth_callbacks: 'users/omniauth_callbacks',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
  }
end
