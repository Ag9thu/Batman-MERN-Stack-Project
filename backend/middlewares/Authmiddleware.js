const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const Authmiddleware = (req,res,next) => {
   
    let token = req.cookies.jwt
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedValue) => {
            if(err) {
                return res.status(401).json({msg : 'token invalid'})
            }else{
                
                User.findById(decodedValue._id).then(user => {
                    req.user = user
                    next()
                })
                }
            
        })
        
        
    }
    else {
        return res.status(400).json({msg : 'token needs to provide'})
    }
}


module.exports = Authmiddleware