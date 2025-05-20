"use client";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer/ImagePreviewer";
import NMImageUploader from "@/components/ui/core/NMImageUploader/NMImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/lib/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogValidationSchema } from "./BlogSchema";
import Tiptap from "./Tiptap";
import { createBlog } from "@/services/Blogs";
const BlogForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(BlogValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageFiles || imageFiles.length === 0) {
      return toast.error("No file selected or invalid file input.");
    }

    const file = imageFiles[0];

    const uploadedFileURL = await uploadFile(file);

    const modifiedData = {
      ...data,
      imageUrl: uploadedFileURL,
    };
    try {
        const res = await createBlog(modifiedData);
        if (res?.success) {
          toast.success(res?.message);
          form.reset();
          router.push(`/manage-blog`);
          setImagePreview([]);
          setImageFiles([]);
        } else {
          toast.error(res?.message);
        }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-5xl p-5 my-5">
      <div className="flex items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold">Create Blogs</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="flex justify-between items-center py-3 ">
                <p className="text-primary font-bold text-xl">Images</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 ">
                {!imageFiles[0] && (
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                  />
                )}
                <ImagePreviewer
                  className="grid grid-cols-12  gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" pt-5">
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <Tiptap
                      value={field.value}
                      onChange={(content) => field.onChange(content)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full my-5">
            {isSubmitting ? "Creating Blog..." : "Create Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
