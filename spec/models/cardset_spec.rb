require 'rails_helper'

RSpec.describe Cardset, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "self.get_nums_only should return the correct array" do
    test_board = [{value: "3"}, {value: "+"}, {value: "5"}, {value: "="}, {value: "8"}]

    expect(Cardset.get_nums_only(test_board)).to eq(["3", "5", "8"])
  end

  it "self.already_in_collection should return true if the cardset is already in the collection" do
    test_set = ["3", "2", "5", "1", "8"]

    expect(Cardset.already_in_collection(test_set)).to eq(true)
  end

  it "self.already_in_collection should return false if the cardset is not in the collection" do
    test_set = ["32", "2", "500", "1", "8"]

    expect(Cardset.already_in_collection(test_set)).to eq(false)
  end
end
