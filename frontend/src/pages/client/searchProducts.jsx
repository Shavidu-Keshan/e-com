import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

export default function SearchProductPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        
        if (query.length > 0) {
            // Search for products
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + query)
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Search failed:", err);
                    setIsLoading(false);
                });
        } else {
            // Get all products when query is empty
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch products:", err);
                    setIsLoading(false);
                });
        }
    }, [query]); 

    return (
        <div className="w-full md:h-screen flex  flex-col    bg-gray-100  p-[40px] gap-1 items-center  justify-center">
            <input 
                type="text" 
                placeholder="Search products..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 italic text-gray-500 w-full max-w-md mb-6 items-center justify-center"
            />
            <div className="w-full md:h-screen flex flex-col md:flex-row bg-gray-100 p-[40px] gap-10 items-center md:items-start justify-center">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}