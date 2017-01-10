class GamesController < ApplicationController
  def index
    # find a random card set from the database
    # make it an @variable that you will referece in the view
    # the object will have properties that you reference by
    # var = db.collectionname.find()
    # var["attribute(key in the DB)"]
    # @card_values = {cardSet: [0,1,2,3,4]}
    # TODO: how do you call the database???
    @dbset = Game.get_random_card_set
    @hand_info = {cardSet: @dbset}
    @operator_hand_info = {cardSet: ["+", "-", "*", "/", "="]}

    @playing_board = {toDisplay: "THIS IS THE BOARD", items: []}
  end

  def create
    @game = Game.new(cardset: params[:final_board]) #item_array

    if @game.check_valid_equation
      if @game.insert_document
        render json: @game
      else
        head 500 # OR OTHER ERROR CODE
      end
    else
      head 400
      # render json: {message: "WRONG"}
    end
  end

  # private
  #
  # def game_params
  #   params.require(:game).permit(:timestart, :timefinish, :level, :user, :cardset)
  # end
end
