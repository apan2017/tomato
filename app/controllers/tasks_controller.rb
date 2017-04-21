class TasksController < ApplicationController
  before_action :require_login

  def index
    @tasks = current_user.tasks.todo.order(id: :desc)
  end

  def create
    @task = current_user.tasks.build params.require(:task).permit(:content)

    if @task.save
      head :ok
    else
      head :internal_server_error
    end
  end

  def update
    @task = current_user.tasks.find params[:id]

    if @task.update params.require(:task).permit(:content)
      head :ok
    else
      head :internal_server_error
    end
  end

  def done
    @task = current_user.tasks.find params[:id]
    @task.is_done = true

    if @task.save
      head :ok
    else
      head :internal_server_error
    end
  end
end
