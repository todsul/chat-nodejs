var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {type: String, default: ''},
    email: {type: String, default: ''},
    hashed_password : {type: String, default: ''},
    salt: {type: String, default: ''}
});

// Crypto

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    })
;

// Validations

var NotBlank = function(value) {
    return value && value.length;
};

UserSchema.path('full_name').validate(function(full_name) {
    return NotBlank(full_name);
}, 'Name is required');

UserSchema.path('email').validate(function(email) {
    return NotBlank(email);
}, 'Email is required');

UserSchema.pre('save', function(next) {
    if (!this.isNew) return next(); // password is virtual, and only set for new records

    if (!NotBlank(this.password)) {
        return next(new Error('Password is required'));
    }

    return next();
});

// Methods

UserSchema.methods = {
    authenticate: function(password) {
        return this.encryptPassword(password) === this.hashed_password;
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },

    encryptPassword: function(password) {
        if (!password) return '';

        try {

            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
            ;

        } catch (err) {
            return '';
        }
    }
};

// Statics

UserSchema.statics = {
  load: function(options, callback) {
    options.select = options.select || 'email full_name';
    this.findOne(options.criteria)
        .select(options.select)
        .exec(callback);
    }
};

mongoose.model('User', UserSchema);
