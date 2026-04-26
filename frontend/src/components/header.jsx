import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
    const navigate = useNavigate();
    return (
        
            <header className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                <GiHamburgerMenu className="h-full text-4xl md:hidden absolute left-5"/>
                <img 
                onClick={() => {
                    navigate("/")
                }}
                src="/men.png" className="w-[40px] h-[60px] m-[5px] object-cover absolute right-5 md:left-4"/>
                <div className="w-[calc(100%-50px)] h-full hidden md:flex  justify-center items-center ">
                    <Link to="/" className="text-2xl font-bold text-black hover:text-blue-700">Home</Link>
                    <Link to="/products" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Products</Link>
                    <Link to="/About" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">About</Link>

                    <Link to="/contact" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Contact</Link>

                </div>
                <div className="w-[80px]  flex justify-center items-center h-full ">
                    <Link to="/cart" className="text-2xl hidden md:flex font-bold text-white hover:text-blue-700"><BsCart className="text-black"/></Link>  

                </div>
                
                    
                        
                   
            </header>
    );
}