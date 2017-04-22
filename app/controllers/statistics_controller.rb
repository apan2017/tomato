class StatisticsController < ApplicationController
  def index
    @clocks = Clock.where('created_at > ?', Time.zone.now.beginning_of_week)
    @today_clocks = Clock.where('created_at > ?', Time.zone.now.beginning_of_day)
    @clocks_counter = Clock.count
    @tasks_count = Task.count
  end
end
