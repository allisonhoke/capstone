module MongoHelper
  def get_client
    return Mongoid::Client.default
  end
end
