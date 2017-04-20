class ClocksController < ApplicationController
  def index
    @clocks = Clock.all.group_by { |a| a.created_at.to_date }
  end

  def today
    @clocks = Clock.where('created_at > ?', Time.zone.now.beginning_of_day).order(id: :desc)
  end

  def create
    @clock = Clock.new params.require('clock').permit(:description, :start_at, :end_at)
    
    if @clock.save
      head :ok
    else
      head :internal_server_error
    end
  end
end
