var path = require('path');
var swig = require('swig');

function register(app) {
    var ENV = app.get('env');

    if (ENV === 'dev' || ENV === 'test') {
        swig.setDefaults({
          cache: false
        });
    }

    app.engine('html', swig.renderFile);
    app.set('views', path.join(__dirname, '/../views'));
    app.set('view engine', 'html');
}

module.exports = {register: register};
