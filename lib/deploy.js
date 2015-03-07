var gulp = require('gulp');
var args = require('yargs').argv;

// @TODO make sure that branch is always master when deploying to prod
var releaseName = new Date().getTime();

var commands = [
    'sudo rm -rf /var/www/flightfox/releases/flightfox ;',
    ' cd /var/www/flightfox/releases/ && sudo git clone https://foxbot:Pilot007@github.com/todsul/flightfox.git --quiet ;',
    'cd /var/www/flightfox/releases/flightfox && sudo npm install  --loglevel error ;',
    'cd /var/www/flightfox/releases/flightfox && sudo gulp prod-css && sudo gulp prod-js',
    'sudo mv /var/www/flightfox/releases/flightfox /var/www/flightfox/releases/' + releaseName + ' ;',
    ' ln -sf /var/www/flightfox/releases/' + releaseName + '/bin/www /var/www/flightfox/www',
    'cd /var/www/flightfox && sudo naught deploy --cwd ./releases/' + releaseName + '/bin'
];

var commands = [
    'cd /var/www/flightfox/releases             && sudo rm -rf flightfox;',
    'cd /var/www/flightfox/releases             && sudo git clone https://foxbot:Pilot007@github.com/todsul/flightfox.git --quiet;',
    'cd /var/www/flightfox/releases/flightfox   && sudo npm install --loglevel error;',
    'cd /var/www/flightfox/releases/flightfox   && sudo gulp prod-css;',
    'cd /var/www/flightfox/releases/flightfox   && sudo gulp prod-js;',
    'cd /var/www/flightfox/releases             && sudo mv flightfox ' + releaseName + ';',
    'cd /var/www/flightfox/releases             && ln -sf ' + releaseName + '/bin/www /var/www/flightfox/www;',
    'cd /var/www/flightfox                      && sudo naught deploy --cwd ./releases/' + releaseName + '/bin;'
];

gulp.task('staging_deploy', function() {
    var ssh = require('./ssh')('staging');

    return ssh
        .exec(
            commands,
            {filePath: 'staging.log'}
        )
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
