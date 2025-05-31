import Order from "../models/order.js";
import Product from "../models/product.js";
export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(401).json({ message: "please login and try again" });
        return;
    }
    
    const orderInfo = req.body;

    if (orderInfo.name == null) {
        orderInfo.name = req.user.firstName + " " + req.user.lastName;
    }

    let orderId = "CBC00001"; // Consistent 5-digit format

    const lastOrder = await Order.findOne().sort({ date: -1 });
    
    if (lastOrder != null) { // Check for null, not length
        const lastOrderId = lastOrder.orderId; // No [0] indexing needed
        const lastOrderNumberString = lastOrderId.replace("CBC", "");
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const newOrderNumber = lastOrderNumber + 1;
        const newOrderNumberString = String(newOrderNumber).padStart(5, '0');
        orderId = "CBC" + newOrderNumberString;
    }
        // let total = 0;
        // let labelledTotal = 0;
        // const products = []

    try{
        let total = 0;
        let labelledTotal = 0;
        const products = []

        for(let i = 0; i<orderInfo.products.length;i++){
             const item = await Product.findOne({productId : orderInfo.products[i].productId})

             if(item == null){
                 res.status(404).json({message : "product not found with productId : " + orderInfo.products[i].productId})
                 return
             }
             if(item.isAvailable == false){
                 res.status(404).json({message : "product not available with productId : " + orderInfo.products[i].productId})
                 return
             }
             
             products[i] = {
                productInfo : {
                    productId : item.productId,
                    name : item.name,
                    altNames : item.altNames,
                    description : item.description,
                    images : item.images,
                    labelledPrice : item.labelledPrice,
                    price : item.price
                },
                qty : orderInfo.products[i].quantity
             }     

             total += item.price * orderInfo.products[i].quantity  
             labelledTotal += item.labelledPrice * orderInfo.products[i].quantity
         }

         
     
    const order = new Order({
        orderId: orderId,
        email: req.user.email,
        name: orderInfo.name,
        address: orderInfo.address,
        total: 0,
        phone: orderInfo.phone,
        products: products,
        labelledTotal: labelledTotal,
        total: total
    });

    try {
        const createdOrder = await order.save();
        res.json({
            message: "Order created successfully",
            order: createdOrder
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order",
            error: error // Use correct variable name
        });
    }

    }catch(error){
        res.status(500).json({
            message : "Failed to create order",
            error : error
        })
    }
}
