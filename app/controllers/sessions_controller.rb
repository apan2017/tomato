class SessionsController < ApplicationController
  def create
    if login(params[:email], params[:password])
      head :ok
    else
      head :internal_server_error
    end
  end
end
