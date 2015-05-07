var gulp = require('gulp');

var releaseName = new Date().getTime();

var commands = [
    'cd /var/www/chat-nodejs/releases               && sudo rm -rf chat-nodejs;', // Remove dir to allow git clone
    'cd /var/www/chat-nodejs/releases               && sudo rm -rf `ls -t | awk "NR>1"`;', // Remove all but latest release
    'cd /var/www/chat-nodejs/releases               && sudo git clone https://foxbot:Pilot007@github.com/todsul/chat-nodejs.git --quiet;',
    'cd /var/www/chat-nodejs                        && sudo cp -rf vendors releases/chat-nodejs/node_modules', // Copy vendors for faster update
    'cd /var/www/chat-nodejs/releases/chat-nodejs   && sudo npm update --loglevel error;', // Update vendors
    'cd /var/www/chat-nodejs/releases/chat-nodejs   && sudo gulp prod-css;', // Bundle assets
    'cd /var/www/chat-nodejs/releases/chat-nodejs   && sudo gulp prod-js;', // Bundle js assets
    'cd /var/www/chat-nodejs                        && sudo cp -rf releases/chat-nodejs/node_modules vendors', // Keep a copy of vendors
    'cd /var/www/chat-nodejs/releases               && sudo mv chat-nodejs ' + releaseName + ';', // Give release a name
    'cd /var/www/chat-nodejs/releases               && sudo ln -sf ' + releaseName + '/bin/www /var/www/chat-nodejs/www;', // Switch the symlink
    'cd /var/www/chat-nodejs                        && sudo naught deploy --cwd ./releases/' + releaseName + '/bin;' // Start her up
];

gulp.task('deploy', function() {
    var ssh = require('./ssh')('prod');

    return ssh
        .exec(commands, {filePath: 'prod.log'})
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
