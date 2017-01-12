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


  def already_in_collection
    client = Mongoid::Clients.default
    collection = client[:cardsets]


  end
end
