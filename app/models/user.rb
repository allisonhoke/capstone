class User
  include Mongoid::Document
  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :location, type: String
  field :image_url, type: String
  field :url, type: String
  field :oauth_token, type: String
  field :oauth_expires_at, type: DateTime
  field :num_puzzles, type: Integer
  validates_presence_of :provider, :uid

  def self.find_by(auth_hash)
    client = Mongoid::Clients.default
    collection = client[:users]

    if current_user = collection.find({uid: auth_hash[:uid]}).first
      return current_user
    end

    return false
  end



  def self.build_from_facebook(auth_hash)
    user = User.new
    user.uid = auth_hash[:uid]
    user.provider = 'facebook'
    user.oauth_token = auth_hash.credentials.token
    user.oauth_expires_at = Time.at(auth_hash.credentials.expires_at)
    if auth_hash['info']['name'] != nil
      user.name  = auth_hash['info']['name']
    else
      user.name  = auth_hash['info']['nickname']
    end
    # user.email = auth_hash['info']['email']

    return user
  end
end
