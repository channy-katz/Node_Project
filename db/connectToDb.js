import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await 
        mongoose.connect(process.env.DB_URI||"mongodb+srv://ckatz300:3g8m7dmtWqUgUshp@project.2qxbgti.mongodb.net/")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}