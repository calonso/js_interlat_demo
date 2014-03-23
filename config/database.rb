require 'erb'

dbconfig = YAML.load(ERB.new(File.read(File.join("config","database.yml"))).result)[ENV['RACK_ENV']]
ActiveRecord::Base.establish_connection(
  adapter:  dbconfig['adapter'],
  host:     dbconfig['host'],
  username: dbconfig['username'],
  password: dbconfig['password'],
  database: dbconfig['database'],
  encoding: dbconfig['encoding']
)

ActiveRecord::Base.logger = Logger.new(STDOUT)
