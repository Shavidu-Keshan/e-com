import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast';


export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoading == true){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((response) => {
                console.log(response.data);
                setProducts(response.data)
                setIsLoading(false)
            });
        }
        
    },[isLoading]);

    function deleteProduct(productId){
        const token = localStorage.getItem("token");
        if(!token){
            toast.error("You are not logged in");
            return;
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, {
            headers: {
                "Authorization" : "Bearer " + token,
            }
        }).then(() => {
            toast.success("Product deleted successfully");
            setIsLoading(true)
        }).catch((error) => {
            toast.error("Error deleting product");
            console.error(error);
        });
    }

    return (
        <div className="w-full h-full bg-gray-50 max-h-full overflow-y-scroll relative rounded-lg">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Product Management</h2>
                
                {!isLoading ? (
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full bg-white border border-blue-100">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-3 px-4 text-left font-medium">Product ID</th>
                                    <th className="py-3 px-4 text-left font-medium">Name</th>
                                    <th className="py-3 px-4 text-left font-medium">Image</th>
                                    <th className="py-3 px-4 text-left font-medium">Labelled Price</th>
                                    <th className="py-3 px-4 text-left font-medium">Price</th>
                                    <th className="py-3 px-4 text-left font-medium">Stock</th>
                                    <th className="py-3 px-4 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr 
                                        key={index} 
                                        className={`border-t border-blue-50 hover:bg-blue-50 transition-colors ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'
                                        }`}
                                    >
                                        <td className="py-3 px-4">{product.productId}</td>
                                        <td className="py-3 px-4 font-medium">{product.name}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-start">
                                                <img 
                                                    src={product.images[0]} 
                                                    alt={product.name}
                                                    className="w-[50px] h-[50px] object-cover rounded-md border border-blue-100" 
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">${product.labelledPrice}</td>
                                        <td className="py-3 px-4 text-blue-600 font-medium">${product.price}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                product.stock > 10 ? 'bg-green-100 text-green-800' : 
                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-3 justify-center items-center">
                                                <button 
                                                    onClick={() => deleteProduct(product.productId)}
                                                    className="p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
                                                    title="Delete product"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button 
                                                    onClick={() => navigate('/admin/edit-product', {
                                                        state: product
                                                    })}
                                                    className="p-2 bg-blue-50 text-blue-500 rounded-md hover:bg-blue-100 transition-colors"
                                                    title="Edit product"
                                                >
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-16">
                        <div className="w-[70px] h-[70px] border-[5px] border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
            
            <Link 
                to="/admin/add-product" 
                className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-colors"
                title="Add new product"
            >
                +
            </Link>
        </div>
    );
}