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

    set_of_cards = collection.find({level: "easy"}).first[:cardSet]
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
end
