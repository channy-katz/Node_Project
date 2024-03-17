import { userModel,generateToken } from "../models/user.js";

import bcrypt from "bcryptjs";

export const addUser = async (req, res) => { 
    let { email, password, userName } = req.body;

    if (!email || !password || !userName){
        return res.status(404).json({ type: "missing parameters", message: "please send email user name and password" })
    }
        try {
            const sameUser = await userModel.findOne({ email: email });
            if (sameUser)
                return res.status(409).json({ type: "same user", message: "user with such email already exists" })
            let hashedPassword = await bcrypt.hash(password, 15);
            let newUser = new userModel({ email, password: hashedPassword, userName, role: "USER" });
            await newUser.save();
            let token = generateToken(newUser._id, newUser.userName, newUser.role);
            res.json({ _id: newUser.id, userName: newUser.userName, token, email: newUser.email,role:newUser.role })
        }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot add user" })
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password){
        return res.status(404).json({ type: "missing parameters", message: "please send email user name and password" })
    }
    try {
        const user = await userModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "no  user", message: "one or more details are invalid" })
        if (! await bcrypt.compare(password, user.password))
            return res.status(404).json({ type: "no  user", message: "user password is invalid" })
        let token=generateToken(user._id,user.userName,user.role);
        return res.json({_id:user.id,userName:user.userName,token,email: user.email,role:user.role})
    }
    
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}

export const getAllUsers = async (req, res) => {

    try {

        let allUsers = await userModel.find({}, "-password");
        res.json(allUsers);

    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}