module Calendar
  require 'open-uri'
  require 'set'
  require 'date'

  URL_TEMP = 'https://www.timeanddate.com/holidays/india/'

  DD = Date.today
  INTERVAL = 365

  def Calendar.valid_holiday(d)
    d['class']!='head' && ( d.css('td').last.text=='Gazetted Holiday') #'Restricted Holiday'
  end

  def Calendar.generate_holidays
    yy =  DD.year
    holidays = Set.new
    urls = [  URL_TEMP+yy.to_s , URL_TEMP+(yy+1).to_s  ]
    
    urls.each_with_index do |i,index|
      table = Nokogiri::HTML(open(i)).css('table')
      table.search('tr').each do |j|  
        holidays.add( Date.parse(j.css('th').text+" "+(yy+index).to_s) ) if Calendar::valid_holiday(j)
      end
    end        
    
    p "Fetched gazzetted holiday list from #{URL_TEMP+yy.to_s}"
    
    holidays
  end

  HOLIDAYS = Calendar.generate_holidays

  def Calendar.mapping(date,holidays)
    return '1' if date.wday==0 || date.wday==6  || holidays.include?(date)    #sat/sun/gazetted holidays
    return '0'
  end


  def Calendar.initial_holidays
    resp = []
    holidays = Calendar::HOLIDAYS

    (DD..DD+INTERVAL).each do |i|
      val = mapping(i,holidays)
      resp << i if Calendar::mapping(i,holidays) == '1'
    end
    resp
  end

  def Calendar.make_chromosome
    chromosome = ''
    holidays = Calendar::HOLIDAYS

    (DD..DD+INTERVAL).each do |i|
      chromosome<<mapping(i,holidays)
    end
    p "Chromosome template made !" 
    chromosome
  end

  CHROMSOME_TEMPLATE = Calendar.make_chromosome

end

