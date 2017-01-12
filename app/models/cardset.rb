class Cardset
  include Mongoid::Document
  field :set, type: Array


  def self.get_nums_only(final_board)
    board = final_board  #array of hash {value: "n"}
    values = []

    #put the values in the array
    board.each do |card| #each card is a object/hash {value: "value"}
      if card[:value] =~ /\d/
        values << card[:value]
      end
    end

    return values #array of strings
  end


  def self.already_in_collection(set_of_cards)
    client = Mongoid::Clients.default
    collection = client[:cardsets]

    # total_in_collection =

    # return total_in_collection
    if collection.find({set: set_of_cards}).nil?
      return false
    else
      return true
    end
  end
end
