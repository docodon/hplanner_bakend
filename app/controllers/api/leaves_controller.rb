module Api
	class LeavesController < BaseController
	
	def index
		@list = Calendar.initial_holidays
	end	

	def plan
	end

	end
end