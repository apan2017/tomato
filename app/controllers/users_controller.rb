class UsersController < ApplicationController

  def create
    @user = User.new params.require(:user).permit(:email, :password, :password_confirmation)

    if @user.save
      head :ok
    else
      render json: @user.errors, status: :internal_server_error
    end
  end
end
