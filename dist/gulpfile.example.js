var gulp = require('gulp');
var pemFile = './aws/flightfox-20131029.pem';
var ssh = require('gulp-ssh')({
    ignoreErrors: false,
    sshConfig: {
        host: '52.11.26.126', // @TODO read from env
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(pemFile)
    }
});

// DEPLOYMENT
var deployDir = '/var/www/flightfox/';
var githubCredentials = 'your_github_username:your_github_password';

// @TODO make sure that branch is always master when deploying to prod
var gitBranch = 'master';

var repository = 'https://' + githubCredentials + '@github.com/todsul/flightfox.git';

var baseDir = '/var/www/flightfox';
var date = new Date();
var releaseName = 'release-' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

var deployCommands = {
    clearReleaseDir: 'sudo rm -rf ' + baseDir + '/releases/flightfox ;',
    cloneRepo: 'cd ' + baseDir + '/releases/ && sudo git clone ' + repository + ' > /dev/null 2>&1 ;',
    switchBranch: gitBranch === 'master' ? " echo 'Already in master. Skipping...' ;" : ('cd ' + baseDir + '/releases/flightfox && sudo git checkout ' + gitBranch + ' ;'),
    npmInstall: 'cd ' + baseDir + '/releases/flightfox && sudo npm install  --loglevel error ;',
    // @TODO run tests, do other integrity checks
    upgradeToReleaseDir: 'sudo mv ' + baseDir + '/releases/flightfox ' + baseDir + '/releases/' + releaseName + ' ;',
    clearLiveDir: 'sudo rm -rf ' + baseDir + '/live ;',
    linkLiveDir: 'sudo ln -s ' + baseDir + '/releases/' + releaseName + ' ' + baseDir + '/live ;',
};

gulp.task('deploy', function() {
    return ssh
        .exec(
            [
                deployCommands.clearReleaseDir,
                deployCommands.cloneRepo,
                deployCommands.switchBranch,
                deployCommands.npmInstall,
                // @TODO run tests, do other integrity checks
                deployCommands.upgradeToReleaseDir,
                deployCommands.clearLiveDir,
                deployCommands.linkLiveDir
            ],
            {filePath: 'deploy.log'}
        )
        .pipe(gulp.dest('./'))
    ;
});


// Fixtures in staging server. @TODO make sure this is not run on a prod box

var otherCommands = {
    resetDB: 'cd ' + baseDir + '/live && sudo npm run-script db',
};

gulp.task('reset_staging_db', function() {
    return ssh.exec([otherCommands.resetDB], {filePath: 'deploy.log'})
        .pipe(gulp.dest('./'))
    ;
});


// @TODO task to setup server
