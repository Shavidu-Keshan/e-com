import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister() {
        try {
             await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/api/user',
                {
                    firstName,
                    lastName,
                    email,
                    password
                }
            );
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Error registering user"
            );
        }
    }

    return (
        <div className="w-full bg-[url('/login1.jpg')] min-h-screen bg-cover bg-center flex flex-col md:flex-row justify-center md:justify-between items-center p-4 sm:p-8 md:p-12 lg:px-32 relative gap-10">
            {/* Left Side: Business Info */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left drop-shadow-xl p-4 md:p-0">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    <span className="text-white">Fashion</span><span className="text-[#4681f4]">Zone</span>
                </h1>
                <p className="text-lg md:text-xl text-white font-semibold max-w-md drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Join us today. Create an account to shop smarter and live better.
                </p>
            </div>

            {/* Right Side: Register Form */}
            <div className="w-full max-w-md h-auto py-10 px-6 sm:px-10 backdrop-blur-md bg-white/40 shadow-2xl rounded-3xl flex flex-col justify-center items-center gap-5 border border-white/50">
                <h2 className="text-3xl font-extrabold text-gray-800 drop-shadow-sm mb-2">Create Account</h2>
                
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                        <input 
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            className="w-full h-[50px] px-4 border-2 border-gray-200/60 rounded-xl focus:outline-none focus:border-[#4681f4] focus:bg-white bg-white/70 transition-all font-medium text-gray-800 shadow-sm"
                        />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                        <input 
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            className="w-full h-[50px] px-4 border-2 border-gray-200/60 rounded-xl focus:outline-none focus:border-[#4681f4] focus:bg-white bg-white/70 transition-all font-medium text-gray-800 shadow-sm"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full h-[50px] px-4 border-2 border-gray-200/60 rounded-xl focus:outline-none focus:border-[#4681f4] focus:bg-white bg-white/70 transition-all font-medium text-gray-800 shadow-sm"
                    />
                </div>

                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <input 
                        type="password"
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full h-[50px] px-4 border-2 border-gray-200/60 rounded-xl focus:outline-none focus:border-[#4681f4] focus:bg-white bg-white/70 transition-all font-medium text-gray-800 shadow-sm"
                    />
                </div>

                <div className="w-full flex flex-col gap-3 mt-2">
                    <button  
                        onClick={handleRegister} 
                        className="w-full h-[52px] rounded-xl text-lg font-bold bg-[#4681f4] text-white hover:bg-[#326ee6] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 cursor-pointer"
                    >
                        Register
                    </button>
                    
                    <div className="text-center mt-2 text-sm font-medium text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#4681f4] hover:text-[#326ee6] hover:underline underline-offset-2 transition-all">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}