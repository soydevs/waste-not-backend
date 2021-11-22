import mongoose, { Schema } from 'mongoose';

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
        required: true
    },
    volunteer: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const DisposeRequest = mongoose.model('Dispose', disposeRequestSchema);
export { DisposeRequest };