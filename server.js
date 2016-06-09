var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
  */

app.listen(Config.app.port, function(){
    console.log('Server started on port '+ Config.app.port);
});








