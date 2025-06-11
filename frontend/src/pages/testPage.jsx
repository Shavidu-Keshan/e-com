import { useState } from "react";

export default function TestPage() {

    const [count, setCount] =useState(0)

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
        <div className="bg-white h-[250px] w-[500px] flex justify-center items-center">
            <button onClick={() => {
                setCount(count - 1)
            }} className="h-[100px] w-[100px] bg-blue-600 text-white flex items-center justify-center text-5xl font-bold cursor-pointer">
                -
            </button>
            <span className="text-5xl font-bold mx-10">
                {count}
            </span>
            <button onClick={() =>{
                setCount(count + 1)
            }} className="h-[100px] w-[100px] bg-blue-600 text-white flex items-center justify-center text-5xl font-bold cursor-pointer">
                +
            </button>
        </div>
    </div>
  );
}
