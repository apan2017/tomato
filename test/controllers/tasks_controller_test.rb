require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  test "should be redirect without auth" do
    get tasks_url, as: :json
    assert_redirected_to signin_url
  end

  test 'should be work' do
    login_in
    get tasks_url, as: :json
    assert_response :success
  end

  test 'should be create' do
    login_in
    task = tasks(:task_one)
    post tasks_url, params: {task: task.attributes}
    assert_response :success
    assert current_user.id, task.user.id
  end

  test 'should be update' do
    login_in
    task = tasks(:task_one)
    put task_url(task.id), params: {task: {content: 'change', priority: 'high'}}
    task.reload
    assert 'change', task.content
    assert 'high', task.priority
  end

  test 'should be complete' do
    login_in
    task = tasks(:task_one)
    patch done_task_url(task.id)
    assert_not_nil task.reload.completed_at
  end

  test 'get range' do
    login_in
    get days_tasks_url(start: Time.zone.now), as: :json
    assert_response :success
  end
end
