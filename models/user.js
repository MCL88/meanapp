//Importazioni delle librerie necessarie per definire lo Schema User

const mongoose         =       require("mongoose");
const bycrypt           =       require("bcryptjs");
const config            =       require("../config/database");

const UserSchema = mongoose.Schema({
    name :{
        type        :   String
    },
    email :{
        type        :   String,
        required    :   true
    },
    age :{
        type        :   String,
        required    :   true
    },
    username :{
        type        :   String,
        required    :   true
    },
    password :{
        type        :   String,
        required    :   true
    }
});

const User = module.exports = mongoose.model("User",UserSchema);

//Funzioni semplici del modello User
module.exports.getUserById = (id, callback) =>{
    User.findById(id, callback);
}
module.exports.getUserByUsername = (username, callback) =>{
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) =>{
    bycrypt.genSalt(10,(err,salt) =>{
        bycrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}