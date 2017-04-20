json.array! @tasks do |task|
  json.id task.id
  json.content task.content
  json.created_at task.created_at.strftime('%m-%d %H:%M')
end