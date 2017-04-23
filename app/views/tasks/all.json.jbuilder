json.array! @tasks do |task|
  json.id task.id
  json.title task.content
  json.start task.created_at.strftime('%Y-%m-%d %H:%M')
  json.end task.completed_at&.strftime('%Y-%m-%d %H:%M')
  json.priority task.priority
end
