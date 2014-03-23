require './interlat_api'
Faye::WebSocket.load_adapter('thin')

$stdout.sync = true

use Rack::Static, :urls => ['/index.html', '/css', '/js', '/images'], :root => 'public'

use Interlat::MapWS

run Interlat::API