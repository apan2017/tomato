class ClocksController < ApplicationController
  before_action :require_login

  def index
    @clocks = current_user.clocks.group_by { |a| a.created_at.to_date }
  end

  def today
    @clocks = current_user.clocks.where('created_at > ?', Time.zone.now.beginning_of_day).order(id: :desc)
  end

  def create
    @clock = current_user.clocks.build params.require('clock').permit(:description, :start_at, :end_at)
    
    if @clock.save
      head :ok
    else
      head :internal_server_error
    end
  end
end
