class Cardset
  include Mongoid::Document
  field :set, type: Array

  # def self.get_nums_only(final_board)
  #   board = final_board  #array of hash {value: "n"}
  #   values = []
  #
  #   #put the values in the array
  #   board.each do |card| #each card is a object/hash {value: "value"}
  #     if card[:value] =~ /\d/
  #       values << card[:value]
  #     end
  #   end
  #
  #   return values.join(",") #string of numbers
  # end
  #
  #
  # def self.already_in_collection(set_of_cards)
  #   client = Mongoid::Clients.default
  #   collection = client[:cardsets]
  #   cards = set_of_cards
  #
  #   total_in_collection = collection.find({"set": cards}).count()
  #
  #   # return total_in_collection
  #   if total_in_collection > 0
  #     return true
  #   else
  #     return false
  #   end
  # end
end
