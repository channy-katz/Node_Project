import mongoose from "mongoose";
import {  orderValidator } from "../models/order.js"
import { orderModel } from "../models/order.js";

export const getAllOrders = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;

    // if(req.xxx)
    try {

        let allOrders = await orderModel.find({
            $or:
                [{ name: txt }, { "firstName": txt }]
        }).skip((page - 1) * perPage).limit(perPage);
        //pagination
        res.json(allOrders)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get orders" })
    }
}



export const getOrderById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני')
        }
        let order = await orderModel.findById({userId:id});
        if (!order)
            return res.status(404).json({ type: "no id", message: "no course with such id" })
        return res.json(order)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}


export const deleteOrder = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
           
            let order = await ordereModel.findById(id);
            if (!order)
            return res.status(404).json({ type: "no order to delete", message: "no course with such id to delete" })

            if(req.user.role!="ADMIN" && order.userId != req.user._id||req.order.isSent == true)
                 return res.status(403).json({type:"not allowed",message:"you are not allowed to delete order, only manger "})
    
            order= await orderModel.findByIdAndDelete(id)
              return res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    } 
}

export const addOrder = async (req, res) => {
    let {  destinationAddress,products } = req.body;
    const result =  orderValidator(req.body);
   
    if (result.error)
    return res.status(500).json({type:"invalid data",message:result.error.details[0].message})
    try {
        // console.log("i am ")
        // let sameOrder = await orderModel.findOne({ userId: _id });
        // if (sameOrder)
        //     return res.status(409).json({ type: "same details", message: "there is already same order" })
        let newOrder = new orderModel({  destinationAddress,  userId:req.user._id ,products});
        await newOrder.save();
        return res.json(newOrder)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }
}


export const updateOrder = async (req, res) => {

    let { role,ordNum } = req.params;
    let updated;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let order = await orderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "course not found", message: "no order with such id" })
        if(role=="ADMIN")
         updated = await orderModel.findByIdAndUpdate(id, req.body, { isSent: true })
        else 
        return res.status(400).json({ type: "not valid role", message: "you are not admin" })
        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}