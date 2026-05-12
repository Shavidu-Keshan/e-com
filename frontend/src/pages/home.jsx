import { Routes, Route } from "react-router-dom";
import  Header  from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import Cart from "./client/cart";
import CheckOutPage from "./client/checkOut";
import Intro from "./intro";
import AboutPage from "./about";
import Contact from "./contact";

export default function Home() {
    return (
        <div className="w-full h-screen flex-col justify-center">
            <Header />
            <div className="w-full h-[calc(100vh-80ph)] flex flex-col items center">
                <Routes path="/*">
                    <Route path="/" element={<Intro />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/About" element={<AboutPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/overview/:productId" element={<ProductOverview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />

                </Routes>

            </div>
            
        </div>
    );
}