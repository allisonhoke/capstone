class GamesController < ApplicationController
  def index
    # find a random card set from the database
    # make it an @variable that you will referece in the view
    # the object will have properties that you reference by
    # var = db.collectionname.find()
    # var["attribute(key in the DB)"]
    @card_values = {value: [0,1,2,3,4]}
  end

  def create
    # @game = ModelObject.new(game_params)
    # if @game.insert_document
    # => render json: @game
    # else
    # => head 500 # OR OTHER ERROR CODE
    # end
  end

  # private
  #
  # def game_params
  #   params.require(:game).permit(:timestart, :timefinish, :level, :user, :cardset)
  # end
end
