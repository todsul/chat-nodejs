var server,
    IOConnection,
    logger;

function exitGracefully() {
    logger('Cluster worker exiting');

    logger('Closing socket connections');
    // for (var i in IOConnection.connected) {
    //     var socket = IOConnection.connected[i];
    //     socket.disconnect();
    // }

    logger('Closing server for new requests');

    server.close(function() {
        logger('All connections done, graceful exit.');
        process.exit(0);
    });

    var timer = setTimeout(function() {
        logger('Forcing exit with some connections left');
        process.exit(1);
    }, 20 * 1000);

    timer.unref(); // prevent getting stuck in memory
}

module.exports = {
    register: function(appServer, appIOConnection, appLogger) {
        server = appServer;
        IOConnection = appIOConnection;
        logger = appLogger;

        logger('Registering cluster events');

        if (process.send) process.send('online');

        process.on('message', function(message) {
            if (message === 'shutdown') {
                logger('SHUTDOWN message received.');
                exitGracefully();
            }
        });
    },

    onError: function() {
        process.send('offline'); // announce we are dying :'(
        logger('Emitting OFFLINE on error and exiting');
        exitGracefully();
    }
};