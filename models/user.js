import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema({
    
    email: { type: String, unique: true },
    userName: String,
    password: String,
    
    role:{ type: String,default:"USER"}

   
})

export const userModel = mongoose.model("users", userSchema)
export const generateToken=(_id,userName,role)=>{
   let token = jwt.sign({_id,userName,role},
    process.env.SECRET_JWT,{
        expiresIn: "1h"
    });
    return token;
}
    