"use client";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

type TImageUploader = {
  label?: string;
  clasName?: string;
  setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
};

const NMImageUploader = ({
  label = "Upload Images",
  setImagePreview,
  setImageFiles,
}: TImageUploader) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <div>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />
      <label
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        htmlFor="image-uploader"
      >
        {label}
      </label>
    </div>
  );
};

export default NMImageUploader;
