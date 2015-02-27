/** @TODO import global env configs **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    text: {type: String, default: '', trim: true},
    created: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref: 'User'}
});

MessageSchema.path('text').required(true, 'Yikes. Your message needs some text');
MessageSchema.path('created').required(true, 'Yikes. Your message created a time paradox');
MessageSchema.path('user').required(true, 'Yikes. Your message cannot be anon');


MessageSchema.statics = {
    load: function(id, callback) {
        this.findOne({_id : id})
            .populate('user', 'full_name email')
            .exec(callback)
        ;
    },

    list: function(options, callback) {
        var criteria = options.criteria || {};
        var limit = options.limit || 10;

        this.find(criteria)
            .populate('user', 'full_name email')
            .sort({'created': -1})
            .limit(limit)
            .exec(callback)
        ;
    }
};

mongoose.model('Message', MessageSchema);
