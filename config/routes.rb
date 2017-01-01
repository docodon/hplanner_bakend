Rails.application.routes.draw do

  namespace :api do
    
    resources :leaves do
      collection do
        get '/' => 'leaves#index'
        post '/plan' => 'leaves#plan'
      end
    end
  
  end
end
