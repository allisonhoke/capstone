class GamesController < ApplicationController
  def index
    dbset = Cardset.all.sample[:set]
    operator_hand_info = ["+", "-", "*", "/", "(", ")"]

    operator_hand_info.each do |card|
      dbset << card
    end

    @playing_board = {cardSet: dbset}

    if session[:user_id]
      @user = User.find_user(session[:user_id])
    else
      @user = {name: "no one"}
    end
  end

  def create
    @game = Game.new(board: params[:final_board], target: params[:target], user: params[:user_id], level: "level", timestart: params[:startTime], timefinish: params[:endTime]) #item_array

    @message = {message: "That is incorrect. Please try again."}

    if @game.check_valid_equation
      if @game.insert_document
        render json: @game
      else
        head 500
      end
    else
      # head 400
      render json: @message
    end
  end
end
