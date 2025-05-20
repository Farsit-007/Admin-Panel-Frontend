import UpdateBlog from "@/components/modules/blogs/UpdateBlog";
import { getSingleBlog } from "@/services/Blogs";

const page = async({params}: {params : Promise<{id : string}>}) => {
     const {id} = await params
      const { data: blog } = await getSingleBlog(id);
    return (
        <div className="flex items-center justify-center">
            <UpdateBlog blog={blog}/>
        </div>
    );
};

export default page;