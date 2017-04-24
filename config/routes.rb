Rails.application.routes.draw do
  root to: 'home#index'

  get 'me' => 'users#me', as: :me
  get 'signin' => 'sessions#new', as: :signin
  delete 'signout' => 'sessions#destroy', as: :signout

  resources :clocks do
    get :today, on: :collection
  end

  resources :tasks do
    patch :done, on: :member
    get :days, on: :collection
  end

  resources :users, only: [:create]
  resources :sessions, only: [:create]

  resources :statistics, only: [:index]
end
