import BlogCard from "@/components/modules/blogs/BlogCard";
import { getAllBlogs } from "@/services/Blogs";
import { TBlog } from "@/types/blog";

const page = async () => {
const { data : blogs} = await getAllBlogs()

  return (
     <div className="flex flex-wrap justify-center gap-10">
      {blogs?.map((b: TBlog,idx : number) => (
       <BlogCard key={idx} b={b}/>
      ))}
    </div>
  );
};

export default page;
