var gulp = require('gulp');
var env = process.env && process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
var mongoose, User, Message;
var users = [];
var messages = [];

function dropDatabase() {
    require('../server/config/persistence').register(env);

    mongoose = require('mongoose');
    User = mongoose.model('User');
    Message = mongoose.model('Message');

    for (var i in mongoose.connection.collections) {
        var collection = mongoose.connection.collections[i];
        collection.drop();
    }
}

// Fixtures are meant to run sequentially.
function userFixtures() {
    var admin = new User({full_name: 'Admin Flightfox', email: 'admin@flightfox.com', password: 'flightfox'});
    var expert = new User({full_name: 'Expert Flightfox', email: 'expert@flightfox.com', password: 'flightfox'});
    var customer = new User({full_name: 'Customer Flightfox', email: 'customer@flightfox.com', password: 'flightfox'});

    sequentialSave([admin, expert, customer], function(savedUsers) {
        users = savedUsers;
        messageFixtures();
    });
}

function messageFixtures() {
    var unsavedMessages = [
        new Message({
            text: 'From New Orleans to Amsterdam,One-Way only ' +
                'Looking for cheapest price, but <24 hours flying time Leaving 16th ' +
                'March (+/- a day), Must arrive before 18th March',
            user: users[2],
            created: new Date(),
        }),
        new Message({
            text: 'My wife is coming with me, sorry for mentioning it',
            user: users[2],
            created: new Date(),
        }),
        new Message({
            text: 'Thanks in advance for your hard work. I will leave juicy tip once I have booked',
            user: users[2],
            created: new Date(),
        }),
    ];

    sequentialSave(unsavedMessages, function(savedMessages) {
        messages = savedMessages;
        exit();
    });
}

function sequentialSave(unsavedEntities, callback, savedEntities) {
    savedEntities = savedEntities || [];

    if (unsavedEntities.length === 0) {
        return callback ? callback(savedEntities) : false;
    }

    var entity = unsavedEntities.shift();

    entity.save(function(err, entity) {
        if (err) return disconnect(err);

        savedEntities.push(entity);
        return sequentialSave(unsavedEntities, callback, savedEntities);
    });
}

function disconnect(err) {
    if (err) console.log(err);
    mongoose.disconnect();
}

function exit() {
    disconnect();
    process.exit();
}

gulp.task('reset_db', function() {
    dropDatabase();
    userFixtures();

    return;
});


// Enter the latest release dir and run the task
var resetDB = "cd `ls -d /var/www/flightfox/releases/*/ | sort -r | head -n 1` && sudo NODE_ENV=prod gulp reset_db";

gulp.task('danger-reset-db', function() {
    var ssh = require('./ssh')('prod');

    return ssh.exec([resetDB],
        {filePath: 'prod.log'})
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
