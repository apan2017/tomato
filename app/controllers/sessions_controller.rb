class SessionsController < ApplicationController
  before_action :require_login, only: [:destroy]

  def create
    if login(params[:email], params[:password])
      head :ok
    else
      head :internal_server_error
    end
  end

  def destroy
    logout
    head :ok
  end
end
