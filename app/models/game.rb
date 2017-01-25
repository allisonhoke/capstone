include MongoHelper

class Game
  include Mongoid::Document
  field :timestart, type: String
  field :timefinish, type: String
  field :level, type: String
  field :user, type: String
  field :board, type: Array
  field :target, type: String

  def insert_document #passed in as hash
    client = get_client
    collection = client[:games]

    if collection.insert_one(timestart: self.timestart, timefinish: self.timefinish, level: self.level, board: self.board, target: self.target, user: self.user)
      return true
    end
  end

  def self.calculate_time(start, finish)
    start_time = DateTime.iso8601(start)
    end_time = DateTime.iso8601(finish)

    total_time = end_time.to_time - start_time.to_time
    return total_time #time in days
  end

  def self.pretty_time(total_time)
    num_of_mins = total_time.to_s[0..-3].to_i / 60
    mins_in_secs = num_of_mins * 60

    if total_time > 60
      return num_of_mins.to_s + " minute(s), " + (total_time - mins_in_secs).to_s[0..4] + " seconds"
    else
      return total_time.to_s + " seconds"
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
    client = get_client
    collection = client[:games]

    user_games = collection.find({user: better_id}) #array of games
    return user_games
  end

  # def find_user_top_games(id)
  #   all_games = Game.find_games_by_user(id)
  #
  #
  # end
end
