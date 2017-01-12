class SessionsController < ApplicationController
  def create
    # render text: request.env['omniauth.auth'].to_yaml
    auth_hash = request.env['omniauth.auth']
    # redirect to login_failure unless auth_hash['uid']

    @user = User.find_by(uid: auth_hash[:uid])
    if @user == false
      # User doesn't match anything in the DB.
      # Attempt to create a new user.
      @user = User.build_from_facebook(auth_hash)
      # render :creation_failure and return unless @user.save
    end

    session[:user_id] = @user.id
    redirect_to games_path and return
  end

  def destroy
    if current_user
      session.delete(:user_id)
      # flash[:success] = 'See you!'
    end
    redirect_to games_path
  end
end
