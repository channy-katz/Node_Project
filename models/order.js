import Joi from "joi";
import mongoose from "mongoose";

export const minimalProduct = mongoose.Schema({
    prodName:String, 
    prodAmount:Number
})

const orderSchema = mongoose.Schema({

  
    ordDate: {type:Date,default: Date.now()},
    destinationAddress:String,
    userId:String,
    products:[minimalProduct],
    isSent:{type:Boolean,default:false},
    
})

export const orderModel = mongoose.model("orders", orderSchema);

export const orderValidator = (_order) => {
    const orderValidationSchema = Joi.object ({
       
        destinationAddress: Joi.string(),
        userId: Joi.string(),

    }).unknown()
    return orderValidationSchema.validate(_order);
}