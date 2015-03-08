var gulp = require('gulp');

var releaseName = new Date().getTime();

var commands = [
    'cd /var/www/flightfox/releases             && sudo rm -rf flightfox;', // Remove dir to allow git clone
    'cd /var/www/flightfox/releases             && sudo rm -rf `ls -t | awk "NR>1"`;', // Remove all but latest release
    'cd /var/www/flightfox/releases             && sudo git clone https://foxbot:Pilot007@github.com/todsul/flightfox.git --quiet;',
    'cd /var/www/flightfox                      && sudo cp -rf vendors releases/flightfox/node_modules', // Copy vendors for faster update
    'cd /var/www/flightfox/releases/flightfox   && sudo npm update --loglevel error;', // Update vendors
    'cd /var/www/flightfox/releases/flightfox   && sudo gulp prod-css;', // Bundle assets
    'cd /var/www/flightfox/releases/flightfox   && sudo gulp prod-js;', // Bundle js assets
    'cd /var/www/flightfox                      && sudo cp -rf releases/flightfox/node_modules vendors', // Keep a copy of vendors
    'cd /var/www/flightfox/releases             && sudo mv flightfox ' + releaseName + ';', // Give release a name
    'cd /var/www/flightfox/releases             && sudo ln -sf ' + releaseName + '/bin/www /var/www/flightfox/www;', // Switch the symlink
    'cd /var/www/flightfox                      && sudo naught deploy --cwd ./releases/' + releaseName + '/bin;' // Start her up
];

gulp.task('deploy', function() {
    var ssh = require('./ssh')('prod');

    return ssh
        .exec(commands, {filePath: 'prod.log'})
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
