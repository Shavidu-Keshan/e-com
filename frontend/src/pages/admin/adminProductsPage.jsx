import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast';


export default function AdminProductsPage() {

    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>{
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
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId ,{
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
        <div className="w-full h-full bg-gray-100 max-h-full overflow-y-scroll relative">
            <Link to="/admin/add-product" className="absolute bottom-4 right-4 bg-green-500 px-4 py-2 rounded text-3xl cu ">+</Link>
            {!isLoading ?
            <table className="w-full ">
                <thead>
                    <tr>
                       <th>Product Id</th> 
                       <th>Name</th>
                       <th>Image</th>
                       <th>Lanbelled Price</th>
                       <th>Price</th>
                       <th>Stock</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center justify-center items-center" >
                    {
                        products.map((product,index)=> {
                            return (
                                <tr key={index}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td><img src={product.images[0]} className="w-[50px] h-[50px]"></img></td>
                                    <td>{product.labelledPrice}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td><div className="flex gap-2 justify-center items-center">
                                        <FaTrash onClick={() => deleteProduct(product.productId)} className="text-green-500 text-2xl cursor-pointer" /> 
                                        <FaEdit onClick={() => navigate('/admin/edit-product',{
                                            state: product
                                        })}className="text-blue-500 text-2xl cursor-pointer" />
                                        </div>
                                    </td>

                                </tr>

                            )
                            

                        }
                    )
                    }

                </tbody>
            </table>
            : 
            <div className="flex justify-center items-center h-full">
                <div className="w-[70px] h-[70px] border-[5px] border-gray-400 border-t-blue-950 rounded-full animate-spin">
                    
                </div>
            </div>
            }
            
        </div>
    );
}