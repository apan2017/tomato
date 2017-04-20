Rails.application.routes.draw do
  root to: 'home#index'

  resources :clocks do
    get :today, on: :collection
  end
end
