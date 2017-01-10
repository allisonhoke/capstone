require 'rails_helper'

RSpec.describe Game, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "#check_valid_equation returns true if a valid equation is passed in" do
    test_board = Game.new(cardset: [{value: "3"}, {value: "+"}, {value: "2"}, {value: "="}, {value: "5"}])

    expect(test_board.check_valid_equation).to eq(true)
  end

  it "#check_valid_equation returns false if an invalid equation is passed in" do
    test_board = Game.new(cardset: [{value: "3"}, {value: "+"}, {value: "3"}, {value: "="}, {value: "5"}])

    expect(test_board.check_valid_equation).to eq(false)
  end

  it "#check_valid_equation returns false if only one card/value is passed in" do
    test_board = Game.new(cardset: [{value: "3"}])

    expect(test_board.check_valid_equation).to eq(false)
  end

  it "#check_valid_equation returns false if only operators are passed in" do
    test_board = Game.new(cardset: [{value: "/"}, {value: "+"}, {value: "*"}, {value: "="}, {value: "-"}])

    expect(test_board.check_valid_equation).to eq(false)
  end

  it "#check_valid_equation returns false if only numbers are passed in" do
    test_board = Game.new(cardset: [{value: "2"}, {value: "3"}, {value: "6"}, {value: "4"}, {value: "9"}])

    expect(test_board.check_valid_equation).to eq(false)
  end
end
