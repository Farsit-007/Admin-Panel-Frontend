import Image from "next/image";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { TBlog } from "@/types/blog";
import DeleteBlog from "./DeleteBlog";

const BlogCard = ({ b }: { b: TBlog }) => {
  return (
    <div className="w-80 bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="">
        <div className="h-[200px]">
          <Image
            src={b.imageUrl.replace("/upload/", "/upload/w_500,q_auto/")}
            alt={b.title}
            width={500}
            height={300}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="p-4 ">
       
          <h2 className="text-xl font-bold text-gray-800 mb-3  ">
            {b.title}
          </h2>

          <div className="flex items-center justify-end gap-2 border-t pt-4">
            <Link
              href={`/manage-blog/${b._id}`}
              className="px-3 flex gap-2 items-center hover:bg-gray-100 py-1 rounded-md"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </Link>
            <DeleteBlog id={b._id}/>
            <Link
              href={`/add-blog/${b._id}`}
              className="px-3 flex gap-2 items-center hover:bg-gray-100 py-1 rounded-md"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;