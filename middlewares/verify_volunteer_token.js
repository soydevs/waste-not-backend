var jwt = require('jsonwebtoken');
var { Volunteer } = require('../models');

async function verifyVolunteerToken(req, res, next) {
    const header = req.header("Authorization");
    const invalidResponse = { "success":false, "message": "Access denied" };
    if(!header) {
        res.status(401).send(invalidResponse)
        return;
    }
    if(!header.startsWith("Bearer ")) {
        res.status(401).send(invalidResponse)
        return;
    }
    const token = header.split(" ")[1]
    try {
      const _id = jwt.verify(token, process.env.TOKEN_SECRET);
      const volunteer = await Volunteer.findById(_id).lean().exec();
      if(!volunteer) {
        res.status(401).send(invalidResponse)
        return;
      }
      req.volunteer = volunteer; 
      next();
    } 
    catch (e) {
        console.log(e)
        res.status(401).send(invalidResponse)
    }
}

module.exports = verifyVolunteerToken;