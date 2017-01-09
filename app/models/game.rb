class Game
  include Mongoid::Document
  field :timestart, type: Date
  field :timefinish, type: Date
  field :level, type: Fixnum
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

    if collection.insert_one(timestart: self.timestart, level: self.level, cardset: self.cardset)
      return true
    else
      return false
    end
  end

  def self.check_valid_equation
    board = self.cardset
    values = []
  #put the values in the array
    board.each do |card| #each card is a object/hash {value: "value"}
      values << card[:value]
    end

    target = values.pop
    equation_str = values[0..-2].join

    if eval(equation_str) == target.to_i
      return true
    else
      return false
    end
    #TODO join into one string and then evaluate the equation
  end
end
