import express from "express";
import { getAllproducts,getproducteById,deleteproduct,addproduct,updateproduct,getProductByCategory } from "../controllers/product.js";
import {authAdmin,auth} from "../middlwares/auth.js"
const router = express.Router();

router.get("/", getAllproducts);
router.get("/category/:category", getProductByCategory);
router.get("/:id", getproducteById);
router.delete("/:id",authAdmin, deleteproduct);
router.post("/",authAdmin, addproduct);
router.put("/:id",authAdmin, updateproduct);

export default router;
// {"prodName":"kamil","imgUrl":"http://localhost:4000/kamil.jpg","price": 750  ,"description":"","category":"loafers"},
// {"prodName":"alina","imgUrl":"http://localhost:4000/alina.jpg","price":  570 ,"description":"","category":"loafers"},
// {"prodName":"bili","imgUrl":"http://localhost:4000/bili.jpg","price": 800  ,"description":"","category":"loafers"},
// {"prodName":"kotor","imgUrl":"http://localhost:4000/kotor.jpg","price": 699  ,"description":"","category":"loafers"},
// {"prodName":"shon","imgUrl":"http://localhost:4000/shon.jpg","price": 890  ,"description":"","category":"loafers"},
// {"prodName":"lona","imgUrl":"http://localhost:4000/lona.jpg","price": 1150  ,"description":"","category":"loafers"},
// {"prodName":"loren","imgUrl":"http://localhost:4000/loren.jpg","price": 750  ,"description":"","category":"loafers"},
// {"prodName":"lila","imgUrl":"http://localhost:4000/lila.jpg","price": 560  ,"description":"","category":"loafers"},
// {"prodName":"beti","imgUrl":"http://localhost:4000/beti.jpg","price": 980  ,"description":"","category":"loafers"},
// {"prodName":"noga","imgUrl":"http://localhost:4000/noga.jpg","price": 999  ,"description":"","category":"loafers"},
// {"prodName":"sefi","imgUrl":"http://localhost:4000/sefi.jpg","price": 789  ,"description":"","category":"loafers"}
