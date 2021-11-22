import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    pincode: {
        type: String
    },
    color: {
        type: String,
        default:'#00ffff'
    },
    pic: {
        type:String,
        default:'https://cache.mrporter.com/content/images/cms/ycm/resource/blob/668500/28301942b66df629b0cecfc075afd064/486383e2-20a2-4398-82d2-af9414b02226-data.jpg/w400_q80.jpg'
    }
})

const User = mongoose.model('User', userSchema);
export { User };