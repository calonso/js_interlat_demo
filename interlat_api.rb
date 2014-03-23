require 'grape'
require "bundler/setup"
require 'active_record'
require 'protected_attributes'

Dir.glob('./{config,model}/**/*.rb').each { |file| require file }

require './api/users_api'
require './api/map_ws'

module Interlat
  class API < Grape::API

    mount UsersAPI

  end
end