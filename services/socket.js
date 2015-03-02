module.exports = function(io) {
    var IOConnection = io.on('connection', function(socket) {
        console.log('connected');
        socket.on('disconnect', function(){
            console.log('disconnected');
        });
    });

    return IOConnection;
};
