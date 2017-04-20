class Clock < ApplicationRecord

  validates :start_at, :end_at, presence: true
end
