var gulp = require('gulp');
gulp.task('default', function() {
    console.log('Please choose a task');
    process.exit(0);
});

var fs = require('fs');
var commandsDir = './commands';
fs.readdirSync(commandsDir).forEach(function (file) {
    if (~file.indexOf('.js')) require(commandsDir + '/' + file);
});
