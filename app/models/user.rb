include MongoHelper

class User
  include Mongoid::Document
  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  # field :location, type: String
  # field :image_url, type: String
  # field :url, type: String
  field :oauth_token, type: String
  field :oauth_expires_at, type: DateTime
  field :num_puzzles, type: Integer
  validates_presence_of :provider, :uid

  def self.find_by(data)
    client = get_client
    collection = client[:users]

    if current_user = collection.find({uid: data[:uid]}).first
      return current_user
    end

    return false
  end

  def self.find_user(id)
    better_id = id["$oid"]
    client = get_client
    collection = client[:users]

    return collection.find(:_id => BSON::ObjectId(better_id)).first
  end

  def self.build_from_facebook(auth_hash)
    client = get_client
    collection = client[:users]

    user = User.new
    user.uid = auth_hash[:uid]
    user.provider = 'facebook'
    user.oauth_token = auth_hash.credentials.token
    user.oauth_expires_at = Time.at(auth_hash.credentials.expires_at)
    user.num_puzzles = 0
    if auth_hash['info']['name'] != nil
      user.name  = auth_hash['info']['name']
    else
      user.name  = auth_hash['info']['nickname']
    end
    # user.email = auth_hash['info']['email']

    if collection.insert_one(provider: user.provider, uid: user.uid, name: user.name, oauth_token: user.oauth_token, oauth_expires_at: user.oauth_expires_at, num_puzzles: user.num_puzzles)
      return user
    else
      return false
    end
  end
end
