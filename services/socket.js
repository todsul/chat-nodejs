var _connectedUsers = {};
var IOConnection;

function addClient(socket) {
    if (!_connectedUsers[socket.userId]) {
        _connectedUsers[socket.userId] = {id: socket.userId, count: 0}; // initialization
    }

    _connectedUsers[socket.userId].count++;

    // User just joined and had no previous connections
    if (_connectedUsers[socket.userId].count === 1) {
        var event = {
            action: 'join',
            users: [socket.userId],
            timestamp: Date.now()
        };

        socket.broadcast.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});
    }
}

// When someone joins, send him/her a list of the clients online
function notifyOccupancy(socket) {
    var _users = [];

    for (var index in _connectedUsers) {
        //var user = _connectedUsers[index];
        //_users.push(user.id);
        _users.push(index);
    }

    var event = {
        action: 'occupancy',
        users: _users,
        timestamp: Date.now()
    };

    socket.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});
}

function removeClient(socket) {
    if (!_connectedUsers[socket.userId]) return;

    _connectedUsers[socket.userId].count--;

    // User disconnected from all devices
    if (_connectedUsers[socket.userId].count === 0) {
        var event = {
            action: 'leave',
            users: [socket.userId],
            timestamp: Date.now()
        };

        socket.broadcast.emit('dashboard', {type: 'PRESENCE_CHANGE', event: event});

        // reduce the object size
        delete _connectedUsers[socket.userId];
    }
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
