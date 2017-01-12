class UsersController < ApplicationController
  def show
    @user = User.find_user(session[:user_id])

  end
end
