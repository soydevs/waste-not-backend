var mongoose = require('mongoose');
const { Schema } = mongoose;

const disposeRequestSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availableTime: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    volunteer: {
        type: Schema.Types.ObjectId,
        ref:'Volunteer'
    },
    status: {
        type: String,
        default: 'pending'
    },
    price: {
        type:String,
        required:true
    }
}, {
    timestamps:true
})

const DisposeRequest = mongoose.model('Dispose', disposeRequestSchema);
module.exports = { DisposeRequest };