class Game
  include Mongoid::Document
  field :timestart, type: Date
  field :timefinish, type: Date
  field :level, type: String
  field :user, type: String
  field :cardset, type: Array

  def self.get_random_card_set
    # TODO: actually get a random set rather than the only one that is in the DB
    client = Mongoid::Clients.default
    collection = client[:games]

    set_of_cards = collection.find({level: "easy"}).first[:cardset]
    return set_of_cards
  end

  def insert_document #passed in as hash
    client = Mongoid::Clients.default
    collection = client[:games]

    if collection.insert_one(timestart: self.timestart, timefinish: self.timefinish, level: self.level, cardset: self.cardset, user: self.user)
      return true
    else
      return false
    end
  end

  def check_valid_equation
    board = self.cardset
    values = []

    #put the values in the array
    board.each do |card| #each card is a object/hash {value: "value"}
      values << card[:value]
    end

    #get the target value alone
    target = values.pop
    #join the rest of the values array WITHOUT the `=`
    equation_str = values[0..-2].join

    #if the target is a number
    if target =~ /\d/
      #evaluate the equation
      if eval(equation_str) == target.to_i
        return true
      end
    end

    return false

  end
end
