# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170422201343) do

  create_table "clocks", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.text     "description"
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["created_at"], name: "index_clocks_on_created_at"
    t.index ["user_id"], name: "index_clocks_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.text     "content",    default: ""
    t.boolean  "is_done",    default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "priority",   default: 1,     null: false
    t.index ["created_at"], name: "index_tasks_on_created_at"
    t.index ["is_done"], name: "index_tasks_on_is_done"
    t.index ["priority"], name: "index_tasks_on_priority"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",            null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
