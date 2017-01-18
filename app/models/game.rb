class Game
  include Mongoid::Document
  field :timestart, type: Date
  field :timefinish, type: Date
  field :level, type: String
  field :user, type: String
  field :board, type: Array
  field :target, type: String

  def insert_document #passed in as hash
    client = Mongoid::Clients.default
    collection = client[:games]

    if collection.insert_one(timestart: self.timestart, timefinish: self.timefinish, level: self.level, board: self.board, target: self.target, user: self.user)
      return true
    else
      return false
    end
  end

  def check_valid_equation
    board = self.board
    target = self.target
    values = []

    #put the values in the array
    board.each do |card| #each card is a object/hash {value: "value"}
      values << card[:value]
    end

    # #get the target value alone
    # target = values.pop
    # #join the rest of the values array WITHOUT the `=`
    # equation_str = values[0..-2].join

    #if the target is a number
    if target =~ /\d/
      #evaluate the equation
      if eval(values.join) == target.to_i
        return true
      end
    end

    return false
  end

  def self.find_games_by_user(id)
    better_id = id["$oid"]
    client = Mongoid::Clients.default
    collection = client[:games]

    user_games = collection.find({user: better_id}) #array of games
    return user_games
  end
end
