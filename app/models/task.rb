class Task < ApplicationRecord

  belongs_to :user

  validates :content, presence: true

  scope :todo, -> { where(completed_at: nil) }
  scope :completing_of_date, -> (date) { where('completed_at > ?', date) }

  enum priority: [:low, :normal, :high]
end
