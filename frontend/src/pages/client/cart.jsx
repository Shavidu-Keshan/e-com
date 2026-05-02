import { useState } from "react";
import { addToCart, getCart,getTotalPrice,removeFromCart } from "../../utils/cart";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full h-screen flex flex-col mt-10 items-center gap-6 relative ">
      <div className="w-[400px] h-[120px] hidden shadow-2xl absolute bottom-1 md:top-1 right-1 flex flex-col justify-center items-center rounded-3xl">
       
          <p className="text-2xl font-bold mb-4">Total:

            <span>
              {getTotalPrice().toFixed(2)}
            </span>
          </p>
          <Link to="/checkout" state={
            {
              cart:cart
            }
          } className="w-[150px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:scale-105">
            Checkout
          </Link>

          
        
      </div>
      {
        cart.map((item) => {
          return (
            <div
              key={item.productId}
              className="relative w-[70%] md:w-[600px] md:h-[100px] rounded-bl-3xl rounded-tl-3xl shadow-2xl flex flex-col md:flex-row  justify-center items-center  md:gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover rounded-3xl"
              />
              <div className="w-[250px] h-full flex flex-col justify-center items-center md:items-start">
                <h2 className="text-lg px-2 font-semibold">{item.name}</h2>
                <h2 className="text-gray-500 px-2">{item.productId}</h2>
                {
                  item.labelledPrice > item.price ? (
                    <div>
                      <span className="text-gray-500 px-2 line-through">{item.labelledPrice}</span>
                      <span className="text-blue-500 px-2 font-semibold">{item.price}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-blue-500 px-2 font-semibold">{item.price}</span>
                    </div>
                  )
                }
              </div>
              <div className="w-[100px] h-full flex flex-row justify-center items-center">
                
                <button className="w-[50px] h-[30px] bg-red-500 text-white rounded hover:scale-105"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(getCart());
                } }>
                  -
                </button>
                <span className="text-lg px-2">{item.quantity}</span>
                <button className="w-[50px] h-[30px] bg-blue-500 text-white rounded hover:scale-105"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(getCart());
                }}>
                  +
                </button>
                
              </div >
              {/* total */}
              
              <div className="w-[150px] h-full flex flex-row justify-center items-center">
                <span className="text-lg px-2 font-semibold">LKR. {item.price * item.quantity}</span>
              </div>
              {/* remove button */}
              <button className="absolute  bg-red-500 text-white rounded-full y-2 right-[-50px] w-[40px] h-[40px]  hover:scale-105 flex justify-center items-center"
              onClick={() => {
                removeFromCart(item.productId);
                setCart(getCart());
              }}>
                <FaTrash />
              </button>
            </div>
          );
        })
      }
      <div className="w-[400px] h-[120px] md:hidden shadow-2xl   flex flex-col justify-center items-center rounded-3xl">
       
          <p className="text-2xl font-bold mb-4">Total:

            <span>
              {getTotalPrice().toFixed(2)}
            </span>
          </p>
          <Link to="/checkout" state={
            {
              cart:cart
            }
          } className="w-[150px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:scale-105">
            Checkout
          </Link>

          
        
      </div>
      
    </div>
  );
}
