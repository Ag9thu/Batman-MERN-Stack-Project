const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name  : {
        type : String,
        required : true,
    },
    email  : {
        type : String,
        required : true,
        unique : true,
    },
    password  : {
        type : String,
        required : true,
    }
}, { timestamps : true});

UserSchema.statics.register = async function(name,email,password) {
    let userExist = await this.findOne({email});
    if(userExist) {
        throw new Error('user already exist');
    }

    let salt = await bcrypt.genSalt();
    let hashvalue = await bcrypt.hash(password,salt);
        
    let user = await this.create({
        name,
        email,
        password : hashvalue});
    return user;

}
UserSchema.statics.login = async function(email,password) {
    let user = await this.findOne({email});
    if(!user) {
        throw new Error('user does not exist');
    }

    let isMatch = await bcrypt.compare(password,user.password);
    if(isMatch) {
        return user
        
    }else{
        throw new Error('wrong password');
    }
    
    

    

}

module.exports = mongoose.model("User",UserSchema);