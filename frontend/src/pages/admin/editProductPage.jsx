import React, { useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
export default function EditProductPage() {
  
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  console.log(location.state);
  
  async function UpdateProduct(){

    const token = localStorage.getItem("token");
    if(!token){
        toast.error("You are not logged in");
        return;
    }
    
    let imageUrls = location.state.images;

    const promiseArray = [];

    for(let i=0;i<images.length;i++){
        promiseArray[i] = mediaUpload(images[i])
    }
    try {
        if(images.length > 0){
            imageUrls = await Promise.all(promiseArray);
        }
        console.log(imageUrls);

        const altNamesArray = altNames.split(",");

        const productData = {
            productId: productId,
            name: name,
            altNames: altNamesArray,
            description: description,
            images: imageUrls,
            labelledPrice: labelledPrice,
            price: price,
            stock: stock
        };

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, productData, {
            headers: {
                "Authorization" : "Bearer " + token,
            }
        }).then((response) => {
            console.log(response.data);
            toast.success("Product added successfully");
            navigate("/admin/products");
        }).catch((error) => {
            console.error(error);
            toast.error("Error adding product");
        });
    } catch (error) {
        console.log(error);
    }



  }

  return (
    <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll relative">
      <div className="p-4">
        <h1 >Edit Product</h1>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <input
          type="text"
          disabled
          placeholder="productID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="text" placeholder="Alt Names" value={altNames} onChange={(e) => setAltNames(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" multiple placeholder="Images"  onChange={(e) => setImages(e.target.files)} />
        <input type="text" placeholder="Labelled Price" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <div className="">
            <Link to="/admin/products" className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</Link>
          <button onClick={UpdateProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

            Update product
          </button>
        </div>
      </div>
    </div>
  );
}
