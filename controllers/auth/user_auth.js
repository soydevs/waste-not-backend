const { User } = require('../../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const colors = ['red', 'blue', 'pink'];

const registerUser = async (data) => {
    const { username, password, name, phone } = data;
    
    if(!username || !password || !name || !phone) 
        return { "success":false, "message":"Bad Request", "code":400 }
    
    try {
        const [existing, uTaken] = await Promise.all([User.findOne({ phone }), User.findOne({ username })]);
        if(existing) 
            return { "success":false, "message":"User with given Number already exists!", "code":304 }
        if(uTaken) 
            return { "success": false, "message":"username already taken!", "code":304 }

        //request validated
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const color = colors[(Math.ceil(Math.random()*5) + 1) % 3];
        
        const user = new User({
            username,
            'password': hash,
            name,
            phone,
            color
        });
        await user.save();

        return { "success": true, "message":"Signup successful!", "code":201 }
    } 
    catch(e) {
        console.log(e);
    }
    return { "success": false, "message":"Request failed!", "code":500 }
}

const loginUser = async (data) => {
    const { username, password, phone } = data;
    if((!username && !phone) || (username && phone))
        return { "success":false, "message":"Bad Request", "code":400 }

    try {

        let user;
        if(username)    user = await User.findOne({ username }).select("+password").lean().exec()
        else    user = await User.findOne({ phone }).select("+password").lean().exec()

        if(!user)
            return { "success": false, "message":"No such user!", "code":304 }
        
        const correct = await bcrypt.compare(password, user.password)
        delete user.password

        if(!correct)
            return { "success": false, "message":"Incorrect username or password", "code":304 }
        
        const token = jwt.sign(
            user._id.toJSON(),
            process.env.TOKEN_SECRET
        );

        return { "success": true, "message":"Login success!" , token, user, "code":200 }//, 200;
    }
    catch(e) {
        console.log(e)
    }
    return { "success": false, "message":"Could'nt Login!", "code":500 }
}

const userAuthController = { registerUser, loginUser }
module.exports = userAuthController;
