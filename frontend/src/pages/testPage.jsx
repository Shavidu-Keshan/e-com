import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import mediaUpload from "../utils/mediaUpload";

//https://yewagxggzrwmdzwaesgc.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld2FneGdnenJ3bWR6d2Flc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTM0MjgsImV4cCI6MjA2ODU4OTQyOH0.QTYEIKLEu7HMrY4NDpUPeHaS6oKIl3PBCWGFhcDncwg

export default function TestPage() {
    const [image, setImage] = useState(null);
  function fileUpload() {
    mediaUpload(image)
      .then((res) => {
        console.log("File uploaded successfully:", res);
      })
      .catch((err) => {
        console.error("File upload failed:", err);
      });
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <input
        type="file"
        className="border border-gray-300 p-2 rounded-md"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button
        onClick={fileUpload}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
}
