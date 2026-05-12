import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    return (
        
            <header className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                <GiHamburgerMenu onClick={() => {setIsMenuOpen(true)}}
                 className="h-full text-4xl md:hidden absolute left-5"
                />
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
                    <Link to="/search" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Search</Link>

                </div>
                <div className="flex justify-center items-center h-full gap-4 mr-5 md:mr-10">
                    <Link to="/cart" className="text-2xl hidden md:flex font-bold text-white hover:text-blue-700"><BsCart className="text-black"/></Link>  
                    
                    {/* Show Login or Logout dynamically based on token */}
                    {!localStorage.getItem("token") ? (
                        <Link to="/login" className="bg-[#4681f4] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#326ee6] transition hidden md:block">Login</Link>
                    ) : (
                        <button 
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload(); // Refresh to update UI
                            }} 
                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition hidden md:block"
                        >
                            Logout
                        </button>
                    )}
                </div>
                {
                    isMenuOpen&&
                    <div className="fixed h-screen inset-0 w-full bg-[#00000060] md:hidden z-50">
                        <div className=" w-[300px] bg-white h-full">
                            <div className="w-full h-[80px] shadow-2xl relative">
                                    <GiHamburgerMenu onClick={() => {
                                        setIsMenuOpen(!isMenuOpen)
                                    }} className="h-full text-4xl md:hidden absolute left-5 cursor-pointer"/>
                                    <div className="w-[80px]  flex justify-center items-center h-full ml-auto ">
                    <Link onClick={() => {
                        setIsMenuOpen(false)
                    }} 
                    
                    to="/cart" className="text-2xl  md:hidden font-bold text-white hover:text-blue-700 "><BsCart className="text-black"/></Link>  

                </div>
                                    
                                    
                            </div>
                            <div className="w-full h-[calc(100%-80px)] flex flex-col justify-start items-start p-5 gap-5">
                                <Link onClick={() => {
                                    setIsMenuOpen(false)
                                }} to="/" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Home</Link>
                                <Link onClick={() => {
                                    setIsMenuOpen(false)
                                }} to="/products" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Products</Link>
                                <Link onClick={() => {
                                    setIsMenuOpen(false)
                                }} to="/About" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">About</Link>

                                <Link onClick={() => {
                                    setIsMenuOpen(false)
                                }} to="/contact" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Contact</Link>
                                <Link onClick={() => {
                                    setIsMenuOpen(false)
                                }} to="/search" className="text-2xl font-bold text-black hover:text-blue-700 ml-5">Search</Link>

                                {/* Show Login/Logout dynamically for mobile sidebar */}
                                {!localStorage.getItem("token") ? (
                                    <Link onClick={() => setIsMenuOpen(false)} to="/login" className="text-2xl font-bold text-[#4681f4] hover:text-[#326ee6] ml-5 mt-4">Login</Link>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            localStorage.removeItem("token");
                                            window.location.reload(); 
                                        }} 
                                        className="text-2xl font-bold text-red-500 hover:text-red-700 ml-5 mt-4"
                                    >
                                        Logout
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                }
                    
                        
                   
            </header>
    );
}