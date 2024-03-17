import Joi from "joi";
import mongoose from "mongoose";



const prodSchema = mongoose.Schema({
    prodName:String,
    description:String,
    imgUrl:[String],
    price:String,
    category:String,
    prodAmount : Number
   
})

export const productModel = mongoose.model("products", prodSchema);

export const productValidator = (_product) =>
 {
    const productValidationSchema = Joi.object    ({
        prodName: Joi.string().min(3).max(20).required(),
        description: Joi.string(),
        imgUrl: Joi.string(),
        price: Joi.number(),
        category:Joi.string()
    })
    return productValidationSchema.validate(_product);
}
    
