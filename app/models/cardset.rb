class Cardset
  include Mongoid::Document
  field :set, type: Array

  def already_in_collection
    
  end
end
