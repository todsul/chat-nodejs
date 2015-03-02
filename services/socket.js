var _connectedUsers = [];
var IOConnection;

function addClient(socket) {
    if (_connectedUsers.indexOf(socket.userId) !== -1) return;

    _connectedUsers.push(socket.userId);

    var event = {
        type: 'join',
        user: socket.userId
    };

    socket.broadcast.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});
}

// When someone joins, send him/her a list of the clients online
function notifyOccupancy(socket) {
    var event = {
        type: 'occupancy',
        users: _connectedUsers,
    };

    socket.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});
}

function removeClient(socket) {
    var index = _connectedUsers.indexOf(socket.userId);
    if (index === -1) return;

    _connectedUsers.splice(index, 1);

    var event = {
        type: 'leave',
        user: socket.userId,
    };

    socket.broadcast.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});
}

module.exports = function(io) {

    // Middleware to register client data
    io.use(function(socket, next) {
        socket.userId = socket.handshake.query.userId;
        // @TODO validate userId. Drop socket connection if invalid.
        // next(new Error('not authorized');
        next();
    });

    IOConnection = io.on('connection', function(socket) {
        console.log('connected...');

        addClient(socket);
        notifyOccupancy(socket);

        socket.on('disconnect', function(){
            console.log('...disconnected');
            removeClient(socket);
        });
    });

    return IOConnection;
};
