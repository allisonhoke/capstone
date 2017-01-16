class UsersController < ApplicationController
  def show
    @user = User.find_user(session[:user_id])

    @games = Game.find_games_by_user(session[:user_id])
  end
end
