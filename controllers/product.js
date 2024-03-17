import mongoose from "mongoose";
import { productModel, productValidator } from "../models/product.js"

export const getAllproducts = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 5;
    try {
        let allproducts = await productModel.find({
            $or:
                [{ name: txt }, { "prodName": txt }]
        }).skip((page - 1) * perPage).limit(perPage);
        res.json(allproducts)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get products" })
    }
}

export const getproducteById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        let product = await productModel.findById( id );
        if (!product)
            return res.status(404).json({ type: "no id", message: "no product with such id" })
        return res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }
}

export const getProductByCategory = async (req, res) => {
    let { category } = req.params;
    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage ||10 ;
    try {
        let product = await productModel.find({category:category}).skip((page - 1) * perPage).limit(perPage);
        if (!product)
            return res.status(404).json({ type: "no id", message: "no product with such category" })
        return res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }
 

}

export const deleteproduct = async (req, res) => {
    let {id} = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })

        let product = await productModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "no product to delete", message: "no course with such id to delete" })

        if (req.user.role != "ADMIN"&&product.userId!=req.user._id)
           res.status(403).json({ type: "not allowed", message: "you are not allowed to delete product, only manger " })

        product = await productModel.findByIdAndDelete(id)
        return res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }
}
export const addproduct = async (req, res) => {
    let {  prodName,description, imgUrl,price ,category} = req.body;

    if (!prodName)
        return res.status(404).json({ type: "missing params", message: "missing details in body: name " })

    const result = await productValidator(req.body);
    console.log(result)
    if (result.errors)
        return res.status(400).json({ type: " invalid data", message: result.errors.details[0].message })

    try {
        let sameProduct = await productModel.findOne({ prodName: prodName });
        if (sameProduct)
            return res.status(409).json({ type: "same details", message: "there is already same product" })

        // if (req.user.role != "ADMIN")
        //     res.status(403).json({ type: "you are not allowed", message: "you are not allowed to add a product" })

        let newProduct = new productModel({
            prodName,description, imgUrl,price,category,
            userId: req.user._id
        });
        await newProduct.save();
         res.json(newProduct)
    }

    catch (err) {
        console.log(err)
     return res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}
export const updateproduct = async (req, res) => {

    let { role } = req.params;
    let { orDate, destinationDate, destinationAddress, userId, products, isSent } = req.body;
    let updated;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let product = await productModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "course not found", message: "no product with such id" })
        if (role == "ADMIN")
            updated = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        else
            return res.status(400).json({ type: "not valid role", message: "you are not admin" })
        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}
