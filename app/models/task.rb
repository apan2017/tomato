class Task < ApplicationRecord

  validates :content, presence: true

  scope :todo, -> { where(is_done: false) }
end
