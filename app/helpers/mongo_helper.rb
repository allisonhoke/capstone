module MongoHelper
  def get_client
    return Mongoid::Clients.default
  end
end
