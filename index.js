//require -נקרא commonJS modules\
//import es6 modules

import express from "express";
import orderRouter from "./routes/order.js"
import productRouter from "./routes/products.js"
import userRouter from "./routes/user.js"
import { connectToDB } from "./db/connectToDb.js"
import { config } from "dotenv";
import cors from "cors";
import { errorHandling } from "./middlwares/errorHandling.js";

const printDate = (req, res, next) => {
    console.log("a new request in", Date.now())
    next()
}

const addData = (req, res, next) => {
    req.xxx = { name: "diza" };
    next();

}
const app = express();

app.use("/api/course", printDate)
app.use(addData)
app.get("ap/course",printDate)
app.use(cors())
app.use(express.json());
app.use(express.static("images"));
connectToDB();
config();
 

// app.get("/api/all/:name")
// app.use("/api/all", express.static("files"))

app.use("/api/order",orderRouter );
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.use(errorHandling)

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
   // / api / all / picture2.jpg