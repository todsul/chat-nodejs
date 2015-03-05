var gulp = require('gulp');
var gulpPrint = require('gulp-print');
var pemFile = './aws/flightfox-20131029.pem';
var paramDataSet = require('../server/config/parameters');
var NODE_ENV = 'staging';// @TODO read from command prompt.
var parameters = paramDataSet.get(NODE_ENV);
var args = require('yargs').argv;

var ssh = require('gulp-ssh')({
    ignoreErrors: false,
    sshConfig: {
        host: parameters.server.host,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(pemFile)
    }
});

// DEPLOYMENT
var deployDir = '/var/www/flightfox/';

// @TODO make sure that branch is always master when deploying to prod
var gitBranch = args.branch || 'master';
var repository = 'https://foxbot:Pilot007@github.com/todsul/flightfox.git';
var baseDir = '/var/www/flightfox';
var date = new Date();
var releaseName = 'release-' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

/* cloneRepo command must start with blank space to avoid saving it to the OS history, hence disclosing github credentials.
    Set up ssh keys instead?
 */

var deployCommands = {
    clearReleaseDir: 'sudo rm -rf ' + baseDir + '/releases/flightfox ;',
    cloneRepo: ' cd ' + baseDir + '/releases/ && sudo git clone ' + repository + ' > /dev/null 2>&1 ;',
    switchBranch: gitBranch === 'master' ? "echo 'Already in master. Skipping...' ;" : ('cd ' + baseDir + '/releases/flightfox && sudo git checkout --quiet ' + gitBranch + ' ;'),
    echoLastCommit: " cd " + baseDir + "/releases/flightfox && echo \" Branch: `git rev-parse --abbrev-ref HEAD`, last commit: `git log -1 --pretty=oneline --abbrev-commit` \" ",
    npmInstall: 'cd ' + baseDir + '/releases/flightfox && sudo npm install  --loglevel error ;',
    bundleAssets: 'cd ' + baseDir + '/releases/flightfox && sudo gulp browserify && sudo gulp lesscss',
    // @TODO run tests, do other integrity checks
    upgradeToReleaseDir: 'sudo mv ' + baseDir + '/releases/flightfox ' + baseDir + '/releases/' + releaseName + ' ;',
    stopSever: 'sudo service flightfox stop',
    clearLiveDir: 'sudo rm -rf ' + baseDir + '/live ;',
    linkLiveDir: 'sudo ln -s ' + baseDir + '/releases/' + releaseName + ' ' + baseDir + '/live ;',
    startServer: 'sudo service flightfox start',
};

gulp.task('deploy_staging', function() {
    return ssh
        .exec(
            [
                deployCommands.clearReleaseDir,
                deployCommands.cloneRepo,
                deployCommands.switchBranch,
                deployCommands.echoLastCommit,
                deployCommands.npmInstall,
                deployCommands.bundleAssets,
                // @TODO run tests, do other integrity checks
                deployCommands.upgradeToReleaseDir,
                deployCommands.stopSever,
                deployCommands.clearLiveDir,
                deployCommands.linkLiveDir,
                deployCommands.startServer
            ],
            {filePath: 'staging.log'}
        )
        .pipe(gulpPrint())
        .pipe(gulp.dest('./'))
    ;
});


// Fixtures in staging server. @TODO make sure this is not run on a prod box

var otherCommands = {
    resetDB: 'cd ' + baseDir + '/live && sudo NODE_ENV=' + NODE_ENV + ' npm run-script db',
};

gulp.task('reset_staging_db', function() {
    return ssh.exec([otherCommands.resetDB], {filePath: 'staging.log'})
        .pipe(gulp.dest('./'))
    ;
});


// @TODO task to setup server
