const User = require("../models/Users");

const createToken = require('../helpers/createToken');



const UserController = {
    me : async(req,res) => {
        return (res.send(req.user))
    },
    login : async(req,res) => {
        
        try {
            let {email,password} = req.body;
            let user = await User.login(email,password);
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly : true, maxAge : 3*24*60*60*1000});
            return(res.json({user,token}));
        }
        catch(e) {
            return (res.status(400).json({msg : e.message}))
        }
    },

    register : async(req,res) => {
        try {
            let {name,email,password} = req.body;
            let user = await User.register(name,email,password);
            let token = createToken(user._id)
            res.cookie('jwt',token,{httpOnly : true, maxAge : 3*24*60*60*1000});
            return(res.json({user,token}));
        }
        catch(e) {
            return (res.status(400).json({msg : e.message}))
        }},
    logout : async(req,res) => {
        res.cookie('jwt','',{maxAge : 1});
        return(res.json({msg : 'logged out'}));
    }
}

module.exports = UserController; //export 
    