import { Link, Route, Routes, useLocation } from "react-router-dom"
import AdminProductsPage from "./admin/adminProductsPage"
import AddProductPage from "./admin/addProductPage"
import EditProductPage from "./admin/editProductPage"
import AdminOrdersPage from "./admin/adminOrdersPage";
import axios from "axios";

export default function AdminPage() {

    const location = useLocation();
    const path = location.pathname;

    function getClass(name){
        if(path.includes(name)){
            return "text-blue-600 font-bold bg-blue-100 p-4";
        }
        else{
            return "text-gray-600 p-4";
        }
    }
    return (
        <div className="w-full h-screen  flex">
            <div className="h-full text-blue-600 font-bold px-4 mt-4 text-xl  w-[300px] flex flex-col">
                <Link to="/admin/products" className={getClass("/admin/products")}>Products</Link>
                <Link to="/admin/users" className={getClass("/admin/users")}>Users</Link>
                <Link to="/admin/orders" className={getClass("/admin/orders")}>Orders</Link>
                <Link to="/admin/reviews" className={getClass("/admin/reviews")}>Reviews</Link>
                <Link to="/admin/analytics" className={getClass("/admin/analytics")}>Analytics</Link>
            </div>
            <div className="w-[calc(100%-300px)] border-5 border-blue-500 h-full p-4">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<AdminOrdersPage />} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                    <Route path="/analytics" element={<h1>Analytics</h1>} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/edit-product" element={<EditProductPage />} />
                </Routes>
            </div>
        </div>
    )
}