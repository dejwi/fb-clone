const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    content: { type: String, required: true },
    picUrl: { type: String },
    date: { type: Date, default: Date.now },
    comments: [{
        date: { type: Date, default: Date.now },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String , required: true }
   }]
});

module.exports = mongoose.model('Post', PostSchema);
