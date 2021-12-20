Rails.application.routes.draw do
  root to: 'home#index'

  resources :games, only: %i[index new create show] 
  
  
  
  resources :trainings do
    collection do
      get :youichi_mode
      get :woman_mode
    end
  end
end
