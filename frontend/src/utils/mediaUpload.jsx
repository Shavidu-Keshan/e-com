import { createClient } from "@supabase/supabase-js";

const url = "https://yewagxggzrwmdzwaesgc.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld2FneGdnenJ3bWR6d2Flc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTM0MjgsImV4cCI6MjA2ODU4OTQyOH0.QTYEIKLEu7HMrY4NDpUPeHaS6oKIl3PBCWGFhcDncwg";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file provided");
      return;
    }

    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(newName).data.publicUrl;
           console.log(publicUrl);
           resolve(publicUrl);
      })
      .catch((error) => {
        console.log("Upload failed:", error);
        reject("Upload failed: " + error.message);
      });
  });
    return mediaUploadPromise;
}
