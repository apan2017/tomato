Rails.application.routes.draw do
  root to: 'home#index'

  resources :clocks do
    get :today, on: :collection
  end

  resources :tasks do
    patch :done, on: :member
    get :all, on: :collection
  end

  resources :users, only: [:create]
  resources :sessions, only: [:new, :create]

  resources :statistics, only: [:index]
end
