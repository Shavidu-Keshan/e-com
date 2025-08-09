import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function CheckOutPage() {
    const location = useLocation();
    console.log(location)
  const [cart, setCart] = useState(location.state?.cart || []);


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

  return (
    <div className="w-full h-screen flex flex-col mt-10 items-center gap-6 relative ">
      <div className="w-[400px] h-[120px] shadow-2xl absolute top-1 right-1 flex flex-col justify-center items-center rounded-3xl">
        <div>
          <p className="text-2xl font-bold mb-4">Total:

            <span>
              {getTotal().toFixed(2)}
            </span>
          </p>
          <button className="w-[150px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:scale-105">
            Place Order
          </button>

          
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
