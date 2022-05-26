const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
    between: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function(v,x,z) {
                return !(this.between.length > 2);
            },
            message: props => `${props.value} exceeds maximum array size (10)!`
        }
    }],
    messages: [{
        from: {type: Schema.Types.ObjectId, ref: 'User'},
        content: {type: String}
    }]
});

module.exports = mongoose.model('Chat', Chat);
