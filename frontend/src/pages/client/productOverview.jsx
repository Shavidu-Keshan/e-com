import axios from "axios";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductOverview() {
     const params =useParams();
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

     const productId = params.productId;
  return (
    <div>
      <h1>Product Overview {JSON.stringify(product)}</h1>
    </div>
  );
}