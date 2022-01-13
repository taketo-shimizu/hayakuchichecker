Rails.application.routes.draw do
  root to: 'home#index'
  get 'privacy_policy', to: 'home#privacy_policy'
  get 'inquiry', to: 'home#inquiry'
  get 'terms', to: 'home#terms'

  resources :games, only: %i[index new create ] do
    member do
      get :result
    end
  end

  resources :trainings, only: %i[new create] do
    collection do
      get :high_speed_mode
      get :high_slow_mode
    end
    member do
      get :result
    end
  end
end
