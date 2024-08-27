const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next){

    const person = this;

    if(!person.isModified('password')) return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //overwrite the plainpassword with hash password
        person.password = hashedPassword;

        next();
    }catch(err){
         return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
//create person modal

const person = mongoose.model('person', personSchema)
module.exports = person;