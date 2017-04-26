ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  fixtures :all
  include Sorcery::TestHelpers::Rails
end

class ActionDispatch::IntegrationTest
  attr_reader :current_user

  def login_in(user = users(:user_one), password = 'secret')
    post sessions_url, params: {email: user.email, password: password}
    assert_response :success
    @current_user = user
  end
end
