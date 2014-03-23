class User < ActiveRecord::Base

  attr_accessible :name, :latitude, :longitude, :score

end
