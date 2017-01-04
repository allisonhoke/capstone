class Game
  include Mongoid::Document
  field :timestart, type: Date
  field :timefinish, type: Date
  field :level, type: Fixnum
  field :user, type: String

  def self.get_random_card_set
    client = Mongoid::Clients.default
    collection = client[:games]

    set_of_cards = collection.find({level: "easy"}).first[:cardSet]
    return set_of_cards
  end
  # def insert_document #passed in as hash
  #   client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'math-game')
  #   collection = client[:gamesCollection]
  #
  #   if collection.insert_one(title: self.title, date: Time.now, amount: self.amount)
  #     return true
  #   else
  #     return false
  #   end
  # end
end
