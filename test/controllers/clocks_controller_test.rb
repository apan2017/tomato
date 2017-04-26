require 'test_helper'

class ClocksControllerTest < ActionDispatch::IntegrationTest
  test "should be redirect without auth" do
    get clocks_url, as: :json
    assert_redirected_to signin_url
  end

  test 'should be work' do
    login_in
    get clocks_url, as: :json
    assert_response :success
  end

  test 'create a clock' do
    login_in
    post clocks_url, params: {clock: clocks(:today_clock).attributes}
    assert_response :success
  end

  test 'today clocks' do
    login_in
    get today_clocks_url, as: :json
    json = JSON.parse(@response.body)
    assert json['created_date'], Date.today.strftime('%m-%d')
  end
end
