import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
        <div className="w-full bg-[url('/login1.jpg')] h-screen bg-cover bg-center flex justify-center items-center">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[600px] backdrop-blur-md flex flex-col justify-center items-center bg-white/30 rounded-lg shadow-xl gap-5">
                    <input
                        placeholder="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        className="w-[350px] h-[50px] border-2 rounded-2xl px-3"
                    />
                    <input
                        placeholder="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        className="w-[350px] h-[50px] border-2 rounded-2xl px-3"
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="w-[350px] h-[50px] border-2 rounded-2xl px-3"
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="w-[350px] h-[50px] border-2 rounded-2xl px-3"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-[150px] h-[50px] border-2 rounded-2xl text-2xl font-bold bg-[#4681f4] cursor-pointer hover:bg-[#3a6fd8] text-[#ffffff]"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}