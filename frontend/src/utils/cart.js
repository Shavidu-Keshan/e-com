export function getCart(){
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    if (cart == null){
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart)); //can save only strings
    }
    return cart;


}



export function removeFromCart(productId){
    let cart = getCart();

    const newCart = cart.filter((item) => {
        return item.productId !== productId;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
}

export function addToCart(product, quantity){
    let cart = getCart();

    let index = cart.findIndex((item) => {
        return item.productId === product.productId;
    });

    if (index === -1) {
        cart[cart.length] = {
            productId: product.productId,
            name: product.name,
            image: product.images[0],
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity
        };
        // Add this line to save the cart when adding a new item
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        const newQuantity = cart[index].quantity + quantity;
        if (newQuantity <= 0) {
            //remove items from carts
            removeFromCart(product.productId);
            return;
        } else {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}