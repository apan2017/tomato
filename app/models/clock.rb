class Clock < ApplicationRecord

  belongs_to :user

  validates :start_at, :end_at, presence: true
end
