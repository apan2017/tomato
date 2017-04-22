class AddPriorityColumnIntoTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :priority, :integer, null: false, default: 1
    add_index :tasks, :priority
  end
end
