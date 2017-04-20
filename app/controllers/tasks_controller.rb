class TasksController < ApplicationController

  def index
    @tasks = Task.todo
  end

  def create
    @task = Task.new params.require(:task).permit(:content)

    if @task.save
      head :ok
    else
      head :internal_server_error
    end
  end

  def done
    @task = Task.find params[:id]
    @task.is_done = true

    if @task.save
      head :ok
    else
      head :internal_server_error
    end
  end
end
