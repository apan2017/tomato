class AddCompletedAtIntoTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :completed_at, :datetime
    remove_column :tasks, :is_done
    add_index :tasks, :completed_at
  end
end
