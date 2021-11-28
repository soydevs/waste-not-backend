const { User } = require('../models');

const updateUser = async (_id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, data, { new:true }).exec();
        return { "success":true, "message":"update success!", "user":updatedUser, "code":200 }
    } 
    catch(e) {
        console.log(e);
    }

    return { "success":false, "message":"update failed!", "code":500 }
}

const userController = { updateUser };
module.exports = userController;