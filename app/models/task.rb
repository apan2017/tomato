class Task < ApplicationRecord

  belongs_to :user

  validates :content, presence: true

  scope :todo, -> { where(is_done: false) }
end
