import bcrypt from 'bcryptjs'
const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    fName: String,
    lName:String,
    email:String,
    password:String,
    number: Number,
    address:Object,
    isAdmin:Boolean
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)  
})
const User = models?.User || model('User', UserSchema)
export default User