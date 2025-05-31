import express  from "express";
import { deleteProduct, getProducts, getProductsById, saveProduct, updateProduct } from "../controllers/productController.js";


const ProductRouter = express.Router();


ProductRouter.get("/",getProducts);
ProductRouter.post("/",saveProduct)
ProductRouter.delete("/:productId",deleteProduct)
ProductRouter.put("/:productId",updateProduct)
ProductRouter.get("/:productId",getProductsById)

export default ProductRouter;
