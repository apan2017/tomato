class Task < ApplicationRecord

  belongs_to :user

  validates :content, presence: true

  scope :todo, -> { where(completed_at: nil) }

  enum priority: [:low, :normal, :high]
end
