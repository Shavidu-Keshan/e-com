import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
export default function AddProductPage() {
  // productId : {
  //     type : String,
  //     required : true,
  //     unique : true
  // },
  // name : {
  //     type : String,
  //     required : true
  // },
  // altNames : [
  //     {type : String}
  // ],
  // description : {
  //     type : String,
  //     required : true
  // },
  // images : [
  //     {type : String}
  // ],
  // labelledPrice : {
  //     type : Number,
  //     required : true
  // },
  // price : {
  //     type : Number,
  //     required : true
  // },
  // stock : {
  //     type : Number,
  //     required : true
  // },
  // isAvailable : {
  //     type : Boolean,
  //     required : true,
  //     default : true
  // }

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  
  async function AddProduct(){

    const token = localStorage.getItem("token");
    if(!token){
        toast.error("You are not logged in");
        return;
    }
    if(images.length <=0){
        toast.error("Please upload at least one image");
        return;
    }

    const promiseArray = [];

    for(let i=0;i<images.length;i++){
        promiseArray[i] = mediaUpload(images[i])
    }
    try {
        const imageUrls = await Promise.all(promiseArray);
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

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", productData, {
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
        <h1 >Add Product</h1>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <input
          type="text"
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
          <button onClick={AddProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          
            Add product
          </button>
        </div>
      </div>
    </div>
  );
}
