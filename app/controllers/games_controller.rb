class GamesController < ApplicationController
  def index
    @dbset = Game.get_random_card_set
    @hand_info = {cardSet: @dbset}
    @operator_hand_info = {cardSet: ["+", "-", "*", "/", "="]}
    # TODO: add () to operator hand

    @playing_board = {toDisplay: "THIS IS THE BOARD", items: []}

    if session[:user_id]
      @user = User.find_user(session[:user_id])
    else
      @user = {name: "no one"}
    end
  end

  def create
    @game = Game.new(cardset: params[:final_board], user: params[:user_id], level: "level") #item_array
    @cardset = Cardset.new(set: Cardset.get_nums_only(params[:final_board])) # returns array of strings of numbers
    
    @message = {message: "WRONG"}

    if @game.check_valid_equation
      if @game.insert_document
        render json: @game
      else
        head 500 # OR OTHER ERROR CODE
      end
    else
      # head 400
      render json: @message
    end
  end

  # private
  #
  # def game_params
  #   params.require(:game).permit(:timestart, :timefinish, :level, :user, :cardset)
  # end
end
