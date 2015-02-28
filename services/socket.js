module.exports = function(io) {
    io.on('connection', function(socket){

        console.log('connected');

        socket.on('disconnect', function(){
            console.log('disconnected');
        });

        socket.on('message', function(){
            console.log('message');
            socket.broadcast.emit('message');
        });

    });
};
