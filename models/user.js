var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {type: String, default: ''},
    email: {type: String, default: ''},
    password: {type: String, default: ''},
});

// @TODO Validation
// @TODO crypto

UserSchema.statics = {
  load: function(options, cb) {
    options.select = options.select || 'email full_name';
    this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
    }
};

mongoose.model('User', UserSchema);
