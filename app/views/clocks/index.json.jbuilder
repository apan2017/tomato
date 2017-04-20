json.array! @clocks do |date, list|
  json.created_data date.to_s
  json.total_count list.size
  
  json.set! :clocks do
    json.array! list do |clock|
      json.description clock.description
      json.start_at clock.start_at
      json.end_at clock.end_at
    end
  end
end
