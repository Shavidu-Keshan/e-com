import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
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
    if(images.length <= 0){
        toast.error("Please upload at least one image");
        return;
    }

    const promiseArray = [];

    for(let i=0; i < images.length; i++){
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
    <div className="w-full h-full bg-gray-50 max-h-full overflow-y-scroll relative rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">Add New Product</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="productId">
                Product ID
              </label>
              <input
                id="productId"
                type="text"
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="altNames">
                Alternative Names
              </label>
              <input 
                id="altNames"
                type="text" 
                placeholder="Enter alternative names (comma separated)" 
                value={altNames} 
                onChange={(e) => setAltNames(e.target.value)} 
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple names with commas</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="labelledPrice">
                Labelled Price
              </label>
              <input 
                id="labelledPrice"
                type="number" 
                placeholder="Enter labelled price" 
                value={labelledPrice} 
                onChange={(e) => setLabelledPrice(e.target.value)} 
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                Selling Price
              </label>
              <input 
                id="price"
                type="number" 
                placeholder="Enter selling price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="stock">
                Stock
              </label>
              <input 
                id="stock"
                type="number" 
                placeholder="Enter stock quantity" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-4 col-span-full">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea 
              id="description"
              rows="4"
              placeholder="Enter product description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="images">
              Product Images
            </label>
            <input 
              id="images"
              type="file" 
              multiple 
              onChange={(e) => setImages(e.target.files)} 
              className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">Upload one or more product images</p>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <Link 
              to="/admin/products" 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button 
              onClick={AddProduct} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}