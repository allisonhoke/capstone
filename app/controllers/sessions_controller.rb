class SessionsController < ApplicationController
  def create
    auth_hash = request.env['omniauth.auth']

    @user = User.find_by(uid: auth_hash[:uid])
    if @user == false
      # User doesn't match anything in the DB.
      # Attempt to create a new user.
      @user = User.build_from_facebook(auth_hash)
      # render :creation_failure and return unless @user.save
    end

    session[:user_id] = @user[:_id]
    redirect_to user_path(id: @user[:_id])
  end

  def destroy
    if session[:user_id]
      session.delete(:user_id)
    end
    redirect_to games_path
  end
end
