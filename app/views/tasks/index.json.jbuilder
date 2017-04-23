json.array! @tasks do |task|
  json.id task.id
  json.content task.content
  json.created_at task.created_at.strftime('%Y-%m-%d %H:%M')
  json.completed_at task.completed_at&.strftime('%Y-%m-%d %H:%M')
  json.is_completed !!task.completed_at
  json.priority task.priority
end
