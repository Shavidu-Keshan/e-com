import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function CheckOutPage() {
    const location = useLocation();
    console.log(location)
  const [cart, setCart] = useState(location.state?.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  function getTotal(){
    let total =0;
    cart.forEach((item)=>{
        total +=item.price *item.quantity
    })
    return total
    }
    
  

  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  function changeQty(index,quantity){
    const newQty = cart[index].quantity + quantity;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].quantity = newQty;
      setCart(newCart);
    }
  }
  async function PlaceOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order");
      return;
    }
    const orderInformation = {
      products : [],
      phone: phoneNumber,
      address: address
    };

    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        quantity: cart[i].quantity
      };
      orderInformation.products[i] = item;
    }

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderInformation, {
      headers: {
        Authorization: `Bearer ${token}`
      }
      
    })
    toast.success("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");

    }
  }
    

  return (
    <div className="w-full h-screen flex flex-col mt-10 items-center gap-6 relative ">
      <div className="w-[400px] p-6 shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center rounded-3xl bg-white border border-gray-100">
  <div className="w-full space-y-6">
    {/* Total Section */}
    <div className="text-center pb-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h2>
      <div className="flex items-center justify-center gap-2">
        <span className="text-2xl font-bold text-gray-800">Total:</span>
        <span className="text-3xl font-bold text-green-600">
          ${getTotal().toFixed(2)}
        </span>
      </div>
    </div>

    {/* Form Section */}
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Delivery Address
        </label>
        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 resize-none"
        />
      </div>

      {/* Place Order Button */}
      <button 
        className="w-full h-[50px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 hover:scale-[1.02] transform transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={PlaceOrder}
        disabled={!phoneNumber.trim() || !address.trim()}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19" />
          </svg>
          Place Order
        </span>
      </button>
    </div>

    
  </div>
</div>
      {
        cart.map((item, index) => {
          return (
            <div
              key={item.productId}
              className="relative w-[600px] h-[100px] rounded-bl-3xl rounded-tl-3xl shadow-2xl flex flex-row  justify-center items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover rounded-3xl"
              />
              <div className="w-[250px] h-full flex flex-col justify-center items-start">
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
                  changeQty(index,-1)
                } }>
                  -
                </button>
                <span className="text-lg px-2">{item.quantity}</span>
                <button className="w-[50px] h-[30px] bg-blue-500 text-white rounded hover:scale-105"
                onClick={() => {
                  changeQty(index,1)
                }}>
                  +
                </button>
                
              </div >
              {/* total */}
              
              <div className="w-[150px] h-full flex flex-row justify-center items-center">
                <span className="text-lg px-2 font-semibold">LKR. {item.price * item.quantity}</span>
              </div>
              {/* remove button */}
              <button
              className="absolute bg-red-500 text-white rounded-full right-[-50px] w-[40px] h-[40px] hover:scale-105 flex justify-center items-center"
              onClick={() => removeFromCart(index)}
            >
              <FaTrash />
            </button>
            </div>
          );
        })
      }
      
    </div>
  );
}

