Rails.application.routes.draw do
  root to: 'home#index'

  resources :games, only: %i[new] do
    collection do
      get :result
    end
  end
  
  resources :trainings do
    collection do
      get :youichi_mode
      
    end
  end
end
