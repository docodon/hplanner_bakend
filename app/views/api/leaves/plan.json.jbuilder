json.date_from params[:date_from]
json.response @gen.top_results.map{ |i| i.calendar_rep }