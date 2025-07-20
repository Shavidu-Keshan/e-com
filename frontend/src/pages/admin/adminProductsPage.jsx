import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";

export default function AdminProductsPage() {

    const [products,setProducts] = useState([]);

    useEffect(() =>{
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((response) => {
            console.log(response.data);
            setProducts(response.data)
        });
    },[]);

    return (
        <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll ">
            <table className="w-full ">
                <thead>
                    <tr>
                       <th>Product Id</th> 
                       <th>Name</th>
                       <th>Image</th>
                       <th>Lanbelled Price</th>
                       <th>Price</th>
                       <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
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

                                </tr>

                            )
                            

                        }
                    )
                    }

                </tbody>
            </table>
        </div>
    );
}