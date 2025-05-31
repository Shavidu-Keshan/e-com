import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function getProducts(req,res){
     

    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }else{
            const products = await Product.find({isAvailable : true})
            res.json(products)  
        }
    }catch(err){
        res.json({message : "products not found"})
    }
} 

export function saveProduct(req,res){
    
    //is admin pass the user controll is admin function
    if(!isAdmin(req)){
        res.status(401).json({message : "you are not authorized to add product"

        })
        return
    }
    const product = new Product(
        req.body
    )
    product.save().then(() => {
        res.json({message : "product added"})
    }).catch(() => {
        res.json({message : "product not added"})
    })
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(401).json({message : "you are not authorized to delete product"})
        return
    }
    try{
        await Product.deleteOne({productId : req.params.productId})
        res.json({message : "product deleted"})

    }catch(err){
        res.status(500).json({
            message : "product not deleted",
            error : err
        })
    }
}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "you are not authorized to update product"
        })
        return
    }
    const productId = req.params.productId;
    const updatingdata = req.body;

    try {
       await Product.updateOne({productId : productId},updatingdata) //want pass two parameteres for updateOne
        res.json({message : "product updated"})
    } catch (error) {
        res.status(500).json({
            message : "product not updated",
            error : error
        })
    }

}


export async function getProductsById(req,res){

    const productId = req.params.productId

    try{
        const product = await Product.findOne({productId : productId})
        
        if(product == null){
            res.status(404).json({message : "product not found"})
            return
        }
        if(product.isAvailable){
            res.json(product)
        }else{
            if(isAdmin(req)){
                res.json(product)
            }else{
                res.status(404).json({message : "product not found"})
            }
        }
    }catch(err){
        res.status(500).json({message : "product not found"})
    }
}