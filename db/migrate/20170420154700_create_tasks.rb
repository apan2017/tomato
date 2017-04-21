class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.references :user, null: false
      t.text :content, default: ''
      t.boolean :is_done, default: false, null: false

      t.timestamps
    end

    add_index :tasks, :is_done
    add_index :tasks, :created_at
  end
end
