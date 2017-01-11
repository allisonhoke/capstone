provider :facebook, ENV['FACEBOOK_CLIENT_ID'], ENV['FACEBOOK_CLIENT_SECRET'],
  scope: 'public_profile', info_fields: 'id,name,link'
