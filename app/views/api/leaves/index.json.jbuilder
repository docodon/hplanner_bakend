 json.holiday_list @list.to_a
 json.date_from Calendar::DD
 json.date_to Calendar::DD+365
 json.options FitnessFunction.all.map {|i| {'id': i.id,'desc': i.description}}