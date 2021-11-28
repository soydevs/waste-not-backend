var mongoose = require('mongoose');
const { Schema } = mongoose;

const priceSchema = new Schema({
    item: {
        type:String,
        required: true
    },
    price: {
        type: String,
        required:true
    },
    unit: {
        type: String,
        required:true
    }
}, {
    timestamps:true
})

const Price = mongoose.model('Price', priceSchema);
module.exports = { Price };