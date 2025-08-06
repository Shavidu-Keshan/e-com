import { useState } from "react";
import { getCart } from "../../utils/cart";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full h-screen flex flex-col mt-10 items-center gap-6">
      {
        cart.map((item) => {
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
                <button className="w-[50px] h-[30px] bg-blue-500 text-white rounded hover:scale-105">
                  +
                </button>
                <span className="text-lg px-2">{item.quantity}</span>
                <button className="w-[50px] h-[30px] bg-red-500 text-white rounded hover:scale-105">
                  -
                </button>
              </div >
              {/* total */}
              
              <div className="w-[150px] h-full flex flex-row justify-center items-center">
                <span className="text-lg px-2 font-semibold">LKR. {item.price * item.quantity}</span>
              </div>
              {/* remove button */}
              <button className="absolute  bg-red-500 text-white rounded-full y-2 right-[-50px] w-[40px] h-[40px]  hover:scale-105 flex justify-center items-center">
                <FaTrash />
              </button>
            </div>
          );
        })
      }
    </div>
  );
}
