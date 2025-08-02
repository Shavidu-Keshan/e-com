import { Routes, Route } from "react-router-dom";
import  Header  from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";

export default function Home() {
    return (
        <div className="w-full h-screen flex-col justify-center">
            <Header />
            <div className="w-full h-[calc(100vh-80ph)] flex flex-col items center">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/About" element={<h1>About</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/overview/:productId" element={<ProductOverview />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />

                </Routes>

            </div>
            
        </div>
    );
}