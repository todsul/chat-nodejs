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
    var user1 = new User({full_name: 'User 1', email: 'user1@example.com', password: 'password'});
    var user2 = new User({full_name: 'User 2', email: 'user2@example.com', password: 'password'});
    var user3 = new User({full_name: 'User 3', email: 'user3@example.com', password: 'password'});

    sequentialSave([user1, user2, user3], function(savedUsers) {
        users = savedUsers;
        messageFixtures();
    });
}

function messageFixtures() {
    var unsavedMessages = [
        new Message({
            text: 'Hello',
            user: users[0],
            created: new Date(),
        }),
        new Message({
            text: 'How are you?',
            user: users[0],
            created: new Date(),
        }),
        new Message({
            text: 'Nice weather today, aye?',
            user: users[0],
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

gulp.task('reset-db', function() {
    dropDatabase();
    userFixtures();

    return;
});


// PROD RESET

var resetDB = "cd `ls -d /var/www/chat-nodejs/releases/*/ | sort -r | head -n 1` && sudo NODE_ENV=prod gulp reset-db";

gulp.task('reset-db-prod', function() {
    var ssh = require('./ssh')('prod');

    return ssh.exec([resetDB],
        {filePath: 'prod.log'})
        .pipe(gulp.dest(__dirname + '/../dist/'))
    ;
});
