import React, { useState } from "react";
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
  
  async function UpdateProduct() {
    const token = localStorage.getItem("token");
    if(!token) {
        toast.error("You are not logged in");
        return;
    }
    
    let imageUrls = location.state.images;
    const promiseArray = [];

    for(let i=0; i<images.length; i++) {
        promiseArray[i] = mediaUpload(images[i])
    }
    try {
        if(images.length > 0) {
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
            toast.success("Product updated successfully");
            navigate("/admin/products");
        }).catch((error) => {
            console.error(error);
            toast.error("Error updating product");
        });
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="w-full h-full bg-gray-50 max-h-full overflow-y-scroll relative rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">Edit Product</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="productId">
                Product ID
              </label>
              <input
                id="productId"
                type="text"
                disabled
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Product ID cannot be changed</p>
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
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Current Images:</p>
              <div className="flex flex-wrap gap-2">
                {location.state.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`Product ${index+1}`} 
                      className="w-16 h-16 object-cover rounded border border-blue-100" 
                    />
                  </div>
                ))}
              </div>
            </div>
            <input 
              id="images"
              type="file" 
              multiple 
              onChange={(e) => setImages(e.target.files)} 
              className="w-full px-3 py-2 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">Upload new images to replace current ones</p>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <Link 
              to="/admin/products" 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button 
              onClick={UpdateProduct} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}