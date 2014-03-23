module Interlat
  class UsersAPI < Grape::API
    format :json

    resources :users do
      
      desc "Returns a list of all connected users"
      get '/' do
        User.all
      end

      desc "Creates a new user"
      params do
        group :user do
          requires :name, type: String, desc: "New user's name"
          requires :latitude, type: Float, desc: "New user's current latitude"
          requires :longitude, type: Float, desc: "New user's current longitude"
        end
      end
      post '/' do
        user = User.new params[:user]
        if user.save
          user
        else
          error!({errors: user.errors}, 422)
        end
      end

    end

  end
end