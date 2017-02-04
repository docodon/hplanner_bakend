# hplanner_bakend

## Build & development
	
	
specs recommended : 
*	ruby 2.3.1 
*	rails 4.2
*	postgresql db.


instructions for setting up:
* clone the repo
* run - bundle install
* run - rake db:migrate
* run - rails s


### Project overview 

It is backend repo for [project](https://github.com/docodon/holiday_advisor)

[Heroku link](https://secure-atoll-63871.herokuapp.com)


### You can contribute to project by adding fitness functions 
	
 Sample fitness function is as below :

	def fitness_function
	    @fitness_score = 100
        pv=-1
        @string.split('').each_with_index do |ch,j|
          @fitness_score -= ((j-pv)-3 )  if j-pv>3 && ch=='0'
          pv = j if ch!='0'
        end
        @fitness_score = [0 , @fitness_score].max    
	end
	    
Function has two variables: 
* @fitness_score - set its value in your fitness_function (scale of 100 is appreciated)
* @string        - chromosome string of length 366 .

	here
*	s[i] = '0' => 'working day'
*	s[i] = '1' => 'holiday or leave'
*	s[i] = '2' => 'holiday or leave'

	you don't need to play with @string variable .

For the function I need two things : 
* Function code in ruby updating @fitness_score
* Scenario where the function can be used as above one is helpful where person needs frequent leaves and not long vacations .  

_**suggestions or collaborations are highly appreciated and ping me if interested**_

