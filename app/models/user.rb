class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :clocks
  has_many :tasks

  validates :email, uniqueness: true
  validates :password, confirmation: true, length: {minimum: 6}
end
