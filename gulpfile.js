var fs = require('fs');
var commandsDir = './commands';
fs.readdirSync(commandsDir).forEach(function (file) {
    if (~file.indexOf('.js')) require(commandsDir + '/' + file);
});
