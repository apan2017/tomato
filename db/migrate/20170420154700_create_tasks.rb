class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.text :content, default: ''
      t.boolean :is_done, default: false, null: false

      t.timestamps
    end
  end
end
