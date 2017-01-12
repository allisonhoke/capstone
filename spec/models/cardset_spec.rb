require 'rails_helper'

RSpec.describe Cardset, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "#already_in_collection should return true if the cardset is already in the collection" do
    test_cardset = Game.new(cardset: [{value: "3"}, {value: "+"}, {value: "2"}, {value: "="}, {value: "5"}])

    expect(test_cardset.already_in_collection).to eq(true)
  end
end
