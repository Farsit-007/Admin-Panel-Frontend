import { getSingleBlog } from "@/services/Blogs";
import Image from "next/image";
import { format } from "date-fns";
const page = async({params}: {params : Promise<{id : string}>}) => {
     const {id} = await params
     const { data: blog } = await getSingleBlog(id);

    return (
          <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Image Section */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={blog.imageUrl.replace('/upload/', '/upload/w_1200,q_auto/')}
          alt={blog.title}
          width={1200}
          height={630}
          className="object-cover w-full h-64 md:h-96"
        />
      </div>

      {/* Title and Date */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm">
          Published on {format(new Date(blog.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
        </p>
      </div>

      {/* Description Content */}
      <article 
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </div>
    );
};

export default page;