require 'rails_helper'

RSpec.describe Cardset, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "self.get_nums_only should return the correct array" do
    test_board = [{value: "3"}, {value: "+"}, {value: "5"}, {value: "="}, {value: "8"}]

    expect(Cardset.get_nums_only(test_board)).to eq(["3", "5", "8"])
  end

  # it "#already_in_collection should return true if the cardset is already in the collection" do
  #   test_cardset = Cardset.new(set: [{value: "3"}, {value: "2"}, {value: "5"}, {value: "1"}, {value: "8"}])
  #
  #   expect(test_cardset.already_in_collection).to eq(true)
  # end
end
