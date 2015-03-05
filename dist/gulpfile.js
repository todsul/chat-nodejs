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
var releaseName = 'release-' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

var deployCommands = {
    prepareGitWorkspace: 'sudo rm -rf ' + baseDir + '/releases/flightfox ;',
    cloneRepo: ' cd ' + baseDir + '/releases/ && sudo git clone ' + repository + ' > /dev/null 2>&1 ;',
    switchBranch: gitBranch === 'master' ? "echo 'Staying in master branch' ;" : ('cd ' + baseDir + '/releases/flightfox && sudo git checkout --quiet ' + gitBranch + ' ;'),
    echoLastCommit: " cd " + baseDir + "/releases/flightfox && echo \" Branch: `git rev-parse --abbrev-ref HEAD`, last commit: `git log -1 --pretty=oneline --abbrev-commit` \" ",
    npmInstall: 'cd ' + baseDir + '/releases/flightfox && sudo npm install  --loglevel error ;',
    bundleAssets: 'cd ' + baseDir + '/releases/flightfox && sudo gulp browserify && sudo gulp prod-css && sudo gulp prod-js',
    // @TODO run tests, do other integrity checks
    upgradeToReleaseDir: 'sudo mv ' + baseDir + '/releases/flightfox ' + baseDir + '/releases/' + releaseName + ' ;',
    symlinkNewStartupScript: ' ln -sf ' + baseDir + '/releases/' + releaseName + '/bin/www ' + baseDir + '/www',
    naughtDeploy: 'cd ' + baseDir + ' && sudo naught deploy --cwd ./releases/' + releaseName + '/bin',
};

gulp.task('staging_deploy', function() {
    return ssh
        .exec(
            [
                deployCommands.prepareGitWorkspace,
                deployCommands.cloneRepo,
                deployCommands.switchBranch,
                deployCommands.echoLastCommit,
                deployCommands.npmInstall,
                deployCommands.bundleAssets,
                // @TODO run tests, do other integrity checks
                deployCommands.upgradeToReleaseDir,
                deployCommands.symlinkNewStartupScript,
                deployCommands.naughtDeploy
            ],
            {filePath: 'staging.log'}
        )
        .pipe(gulpPrint())
        .pipe(gulp.dest('./'))
    ;
});

var otherCommands = {
    resetDB: 'cd ' + baseDir + '/live && sudo NODE_ENV=' + NODE_ENV + ' npm run-script db',
};

gulp.task('reset_staging_db', function() {
    return ssh.exec([otherCommands.resetDB], {filePath: 'staging.log'})
        .pipe(gulp.dest('./'))
    ;
});

// @TODO task to setup server, including dir structure /var/www/flightox/releases
