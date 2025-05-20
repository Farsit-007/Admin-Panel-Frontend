import ProjectCard from "@/components/modules/project/ProjectCard";
import { getAllProject } from "@/services/Projects";
import { TProject } from "@/types/project";

const page = async () => {
 const { data : projects} = await getAllProject()

  return (
    <div className="flex flex-wrap justify-center  gap-10">
      {projects?.map((p: TProject) => (
       <ProjectCard key={p?._id} p={p}/>
      ))}
    </div>
  );
};

export default page;
