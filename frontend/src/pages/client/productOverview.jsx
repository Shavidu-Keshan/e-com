import axios from "axios";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";

export default function ProductOverview() {
     const params =useParams();
     const productId = params.productId;
     const [status, setStatus] = useState("loading");//loading, success, error
        const [product, setProduct] = useState(null);

     useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId)
        .then((res) => {
            console.log(res.data);
            setProduct(res.data);
            setStatus("success");
        })
        .catch((err) => {
            console.error("Error fetching product details:", err);
            toast.error("Error fetching product details");
            setStatus("error");
        });
       
     }, []);

    //  const productId = params.productId;
  return (
    <>
    {status === "success" &&(
    <div className="w-full h-screen flex">
      <div className=" w-[50%] h-full flex justify-center items-center">
        <ImageSlider images={product.images} />
      </div>
      <div className=" w-[50%] h-full flex justify-center items-center ">
        <div className="w-[500px] h-[600px]  flex items-center flex-col">
          <h1 className="text-3xl font-bold mb-4 text-5xl">{product.name}
            {
            product.altNames.map((name, index) => (
              <span key={index} className="text-gray-400 ">{" | "+name}</span>
            ))
          }
          </h1>
          <h1 className="text-xl mb-4">{product.productId}</h1>
          <p className="text-xl mb-4">{product.description}</p>
          <div className="flex flex-row gap-5">
            <p className=" mb-4 font-semibold text-4xl text-gray-400 line-through
">{product.labelledPrice}</p>
            <p className="mb-4 font-bold text-4xl text-blue-500">{product.price}</p>
          </div>
          
          <p className="text-lg mb-4 text-red-700">Stock: {product.stock}</p>
          <div className="flex mt-5 gap-15">
            <button className="w-[150px] h-[50px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:scale-105">Add to Cart</button>
            <button className="w-[150px] h-[50px] bg-gray-500 text-white py-2 px-4 rounded ml-2 cursor-pointer hover:scale-105">Buy Now</button>
          </div>
        </div>

      </div>
    </div>
    )
  }{
    status === "loading" && (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
      
    )
  }
    </>
   
  );
}