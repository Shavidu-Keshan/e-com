import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

export default function Header() {
    return (
        
            <header className="w-full h-[80px] shadow-2xl flex">
                <img src="/men.png" className="w-[40px] h-[60px] m-[5px] object-cover"/>
                <div className="w-[calc(100%-50px)] h-full flex justify-center items-center ">
                    <Link to="/" className="text-2xl font-bold text-black hover:text-blue-700">Home</Link>
                    <Link to="/products" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Products</Link>
                    <Link to="/About" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">About</Link>

                    <Link to="/contact" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Contact</Link>

                </div>
                <div className="w-[80px]  flex justify-center items-center h-full">
                    <Link to="/cart" className="text-2xl font-bold text-white hover:text-blue-700"><BsCart className="text-black"/></Link>  

                </div>
                
                    
                        
                   
            </header>
    );
}