module HelperFunctions

	def HelperFunctions.binary_search ar,val
		lo , hi = 0 , ar.size - 1
		while 1
			mid = (lo + hi)/2
			(lo..hi).each do |i|
				return i if ar[i]>=val
			end if hi-lo<=3

			if ar[mid] > val
				hi = mid
			elsif ar[mid] == val
				return mid
			else
				lo = mid + 1
			end
		end	
	end

end