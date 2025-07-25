import { Link, Route, Routes } from "react-router-dom"
import AdminProductsPage from "./admin/adminProductsPage"

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-red-900 flex">
            <div className="h-full bg-blue-900 w-[300px] flex flex-col">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
                <Link to="/admin/analytics">Analytics</Link>
            </div>
            <div className="w-[calc(100%-300px)] bg-yellow-300 h-full">
                <Routes path="/*">
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                    <Route path="/analytics" element={<h1>Analytics</h1>} />
                </Routes>
            </div>
        </div>
    )
}