import { Link } from "react-router-dom";

export default function Header() {
    return (
        
            <div className="bg-[#FFFF00]">
                
                    
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                   
            </div>
    );
}