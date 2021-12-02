Rails.application.routes.draw do
  root to: 'home#index'

  resources :games, only: %i[new] do
    collection do
      get :result
    end
  end
  
  resources :trainings, only: %i[new create]
end
