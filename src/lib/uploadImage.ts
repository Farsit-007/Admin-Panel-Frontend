"use server"
const cloudName = "dervoi2c1";
const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
export const uploadFile = async (file: File) => {

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images_preset");
    const res = await fetch(api, {
      method: "POST",
      body: formData, 
    });
    const imgUrl = await res.json();
    console.log(imgUrl.secure_url); 
    return imgUrl.secure_url;
  } catch (error) {
    console.log("Error uploading file:", error);
    throw new Error("Failed to upload the image.");
  }
};
