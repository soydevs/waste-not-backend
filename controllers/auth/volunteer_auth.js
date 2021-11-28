const { Volunteer } = require('../../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const colors = ['red', 'blue', 'pink'];

const registerVolunteer = async (data) => {
    const { username, password, name, phone, aadhaarNo, email } = data;
    
    if(!username || !password || !name || !phone) 
        return { "success":false, "message":"Bad Request", "code":400 }
    
    try {
        const [existing, uTaken] = await Promise.all([Volunteer.findOne({ phone }), Volunteer.findOne({ username })]);
        if(existing) 
            return { "success":false, "message":"Volunteer with given Number already exists!", "code":304 }
        if(uTaken) 
            return { "success": false, "message":"username already taken!", "code":304 }

        //request validated
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const color = colors[(Math.ceil(Math.random()*5) + 1) % 3];
        
        const volunteer = new Volunteer({
            username,
            'password': hash,
            name,
            phone,
            color,
            aadhaarNo,
            email
        });
        await volunteer.save();

        return { "success": true, "message":"Signup successful!", "code":201 }
    } 
    catch(e) {
        console.log(e);
    }
    return { "success": false, "message":"Request failed!", "code":500 }
}

const loginVolunteer = async (data) => {
    const { username, password, phone } = data;
    if((!username && !phone) || (username && phone))
        return { "success":false, "message":"Bad Request", "code":400 }

    try {

        let volunteer;
        if(username)    volunteer = await Volunteer.findOne({ username }).select("+password").lean().exec()
        else    volunteer = await Volunteer.findOne({ phone }).select("+password").lean().exec()

        if(!volunteer)
            return { "success": false, "message":"No such volunteer!", "code":304 }
        
        const correct = await bcrypt.compare(password, volunteer.password)
        delete volunteer.password

        if(!correct)
            return { "success": false, "message":"Incorrect username or password", "code":304 }
        
        const token = jwt.sign(
            volunteer._id.toJSON(),
            process.env.TOKEN_SECRET
        );

        return { "success": true, "message":"Login success!" , token, volunteer, "code":200 }//, 200;
    }
    catch(e) {
        console.log(e)
    }
    return { "success": false, "message":"Could'nt Login!", "code":500 }
}

const volunteerAuthController = { registerVolunteer, loginVolunteer }
module.exports = volunteerAuthController;