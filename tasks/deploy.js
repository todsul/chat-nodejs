var gulp = require('gulp');
var args = require('yargs').argv;

var deployDir = '/var/www/flightfox/';

// @TODO make sure that branch is always master when deploying to prod
var gitBranch = args.branch || 'master';
var repository = 'https://foxbot:Pilot007@github.com/todsul/flightfox.git';
var baseDir = '/var/www/flightfox';
var date = new Date();
var year = date.getFullYear();
var month = ('0' + (date.getMonth + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);
var hour = ('0' + date.getHours()).slice(-2);
var minute = ('0' + date.getMinutes()).slice(-2);
var second = ('0' + date.getSeconds()).slice(-2);

var releaseName = 'release-' + year + '-' + month + '-' + day + '-' + hour + '-' + minute + '-' + second;

var commands = {
    prepareGitWorkspace: 'sudo rm -rf ' + baseDir + '/releases/flightfox ;',
    cloneRepo: ' cd ' + baseDir + '/releases/ && sudo git clone ' + repository + ' --quiet ;',
    switchBranch: gitBranch === 'master' ? "echo 'Staying in master branch' ;" : ('cd ' + baseDir + '/releases/flightfox && sudo git checkout --quiet ' + gitBranch + ' ;'),
    echoLastCommit: " cd " + baseDir + "/releases/flightfox && echo \" Branch: `git rev-parse --abbrev-ref HEAD`, last commit: `git log -1 --pretty=oneline --abbrev-commit` \" ",
    npmInstall: 'cd ' + baseDir + '/releases/flightfox && sudo npm install  --loglevel error ;',
    bundleAssets: 'cd ' + baseDir + '/releases/flightfox && sudo gulp prod-css && sudo gulp prod-js',
    // @TODO run tests, do other integrity checks
    upgradeToReleaseDir: 'sudo mv ' + baseDir + '/releases/flightfox ' + baseDir + '/releases/' + releaseName + ' ;',
    symlinkNewStartupScript: ' ln -sf ' + baseDir + '/releases/' + releaseName + '/bin/www ' + baseDir + '/www',
    naughtDeploy: 'cd ' + baseDir + ' && sudo naught deploy --cwd ./releases/' + releaseName + '/bin',
};

gulp.task('staging_deploy', function() {
    var ssh = require('./ssh')('staging');

    return ssh
        .exec(
            [
                commands.prepareGitWorkspace,
                commands.cloneRepo,
                commands.switchBranch,
                commands.echoLastCommit,
                commands.npmInstall,
                commands.bundleAssets,
                // @TODO run tests, do other integrity checks
                commands.upgradeToReleaseDir,
                commands.symlinkNewStartupScript,
                commands.naughtDeploy
            ],
            {filePath: 'staging.log'}
        )
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
