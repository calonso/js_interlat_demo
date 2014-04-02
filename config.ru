require './interlat_api'
Faye::WebSocket.load_adapter('thin')

$stdout.sync = true

use Interlat::MapWS
use Rack::Static, urls: ['/index.html', '/css', '/js', '/images', '/icons'], root: 'public', index: 'index.html'

run Interlat::API