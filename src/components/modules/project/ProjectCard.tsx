import { TProject } from "@/types/project";
import { ISkill } from "@/types/skill";
import Image from "next/image";
import { Edit,  Eye } from "lucide-react";
import Link from "next/link";
import DeleteProject from "./DeleteProject";

const ProjectCard = ({ p }: { p: TProject }) => {

  return (
    <div className="group relative overflow-hidden w-80 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">

      <div className="relative aspect-video w-full">
        {p.imageUrl?.length > 0 && (
          <Image
            src={p.imageUrl[0]}
            alt={p.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="line-clamp-1 text-lg font-semibold">{p.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {p.description}
          </p>
        </div>

   
        <div className="mb-4 grid grid-cols-6 gap-2">
          {p.tech?.map((item: ISkill, index) => (
            <div
              key={index}
              className="flex size-8 items-center border border-black justify-center rounded-lg bg-muted/50 p-1 hover:bg-muted"
            >
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>


        <div className="flex items-center justify-end gap-2 border-t pt-4">
          <Link href={`/manage-project/${p._id}`}  className="px-3 flex gap-2 items-center hover:bg-gray-100 py-1 rounded-md">
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Link>
          <DeleteProject id={p._id as string}/>
          <Link href={`/add-project/${p._id}`}  className="px-3 flex gap-2 items-center hover:bg-gray-100 py-1 rounded-md">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;