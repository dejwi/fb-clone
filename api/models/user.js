const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    facebook_id: { type: String, required: true },
    picUrl: { type: String, required: true },
    bgUrl: {type: String},
    friends: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    friendReqSend: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    friendReqReceived: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    liked: [ { type: Schema.Types.ObjectId, ref: 'Post'} ]
});

module.exports = mongoose.model('User', UserSchema);
