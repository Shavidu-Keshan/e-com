import express  from "express";
import { deleteProduct, getProducts, getProductsById, saveProduct, updateProduct, searchProducts } from "../controllers/productController.js";


const ProductRouter = express.Router();


ProductRouter.get("/",getProducts);
ProductRouter.post("/",saveProduct)
ProductRouter.delete("/:productId",deleteProduct)
ProductRouter.put("/:productId",updateProduct)
ProductRouter.get("/:productId",getProductsById)
ProductRouter.get("/search/:query",searchProducts) 

export default ProductRouter;
