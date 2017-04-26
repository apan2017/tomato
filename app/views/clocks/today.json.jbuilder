json.created_date Date.today.strftime('%m-%d')
json.total_count @clocks.size

json.set! :clocks do
  json.array! @clocks do |clock|
    json.id clock.id
    json.description clock.description
    json.start_at clock.start_at
    json.end_at clock.end_at
  end
end
