module Api
	class LeavesController < BaseController
	
		def index
			@list = Calendar.initial_holidays
		end	

		def plan
			return render json: { message: "incomplete params"} if incomp_params
			num_gen = 200
			num_chromosomes = 150
			num_leaves = params[:leaves].to_i
			@gen = Generation.new(num_chromosomes, num_leaves, params[:holiday_list], params[:date_from],params[:user_status])

			ar = []
			
			num_gen.times do |i|
				@gen.rate_generation
				ar << @gen.average_score
				@gen.new_generation
			end
			@gen.rate_generation
		end

		private

		def incomp_params
			params[:holiday_list].nil? || params[:date_from].blank? || params[:leaves].blank?
		end
	
	end
end

