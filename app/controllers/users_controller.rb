class UsersController < ApplicationController
  def show
    @user = User.find_user(session[:user_id])

    @all_games = Game.find_games_by_user(session[:user_id])

    @number_of_games = @all_games.count()

    # @top_games = Game.find_user_top_games(session[:user_id])
  end
end
