module Api
	class LeavesController < BaseController
	
		def index
			@list = Calendar.initial_holidays
		end	

		def plan
			return render json: { message: "incomplete params"} if incomp_params
			
			begin 
				num_gen = AlgoDetail.where(property: 'Generations').first.value.to_i
				num_chromosomes = AlgoDetail.where(property: 'Chromosomes').first.value.to_i
			rescue
				num_gen = 300
				num_chromosomes = 150
			end

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

