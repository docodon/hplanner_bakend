Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/theBatcave', as: 'rails_admin'
  namespace :api do
    
    resources :leaves do
      collection do
        get '/' => 'leaves#index'
        post '/gen_plan' => 'leaves#plan'
      end
    end
  
  end
end
