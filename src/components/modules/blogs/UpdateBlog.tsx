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
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Tiptap from "./Tiptap";
import { useEffect } from "react";
import { TBlog } from "@/types/blog";
import { updateBlog } from "@/services/Blogs";
interface blogFormValues {
  title: string;
  description: string;
}

const UpdateBlog = ({ blog }: { blog: TBlog }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(blog?.imageUrl ? [blog.imageUrl] : []);
  const router = useRouter();
  const form = useForm<blogFormValues>({
    defaultValues: {
      title: blog?.title || "",
      description: blog?.description || "",
    },
  });

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        description: blog.description,
      });
   setImagePreview(blog?.imageUrl ? [blog.imageUrl] : []);
    }
  }, [blog,form]);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = imagePreview;
 
    try {
      if (imageFiles.length > 0) {
        imageUrl = await uploadFile(imageFiles[0]);
      }

      const blogData = {
        ...data,
        imageUrl : imageUrl[0],
      };
      

      const res = await updateBlog(blog._id, blogData);
      if (res.success) {
        toast.success(res.message);
        router.push("/manage-blog");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-5xl p-5 my-5">
      <div className="flex items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold">Update Blog</h1>
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
                <p className="text-primary font-bold text-xl">Image</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 ">
                {!imagePreview[0] && (
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                  />
                )}
                {imagePreview && (
                  <ImagePreviewer
                    className="grid grid-cols-12 gap-4"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="pt-5">
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
            {isSubmitting ? "Updating Blog..." : "Update Blog"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBlog;
