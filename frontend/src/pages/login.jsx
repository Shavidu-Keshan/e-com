import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const response= await axios.post('http://localhost:3000/api/user/login', {
                email: email,
                password: password
            });
            toast.success("Login successful:", response.data);
        } catch (error) {
            
            toast.error("Error logging in:", error);
        }
    }

    return (
        <div className="w-full bg-[url('/login1.jpg')] h-screen bg-cover bg-center flex  justify-center items-center">
            <div className="w-[50%] h-full "> 

            </div>
            <div className="w-[50%] h-full flex justify-center items-center"> 
                <div className="w-[500px] h-[600px]  backdrop-blur-md flex flex-col justify-center items-center bg-white/30 rounded-lg shadow-xl gap-5">
                    <input 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    className="w-[350px] h-[50px] border-2 rounded-2xl "/>
                    <input 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    value = {password}
                    className="w-[350px] h-[50px] border-2 rounded-2xl "/>
                    <button  onClick={handleLogin} className="w-[150px] h-[50px] border-2 rounded-2xl text-2xl font-bold bg-[#4681f4] cursor-pointer hover:bg-[#3a6fd8] text-[#ffffff]">Login</button>
                    
                </div>
            </div>
        </div>
    );
}