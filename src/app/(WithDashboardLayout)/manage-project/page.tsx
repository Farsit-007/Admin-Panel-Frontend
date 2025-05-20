import ProjectCard from "@/components/modules/project/ProjectCard";
import { getAllProject } from "@/services/Projects";
import { TProject } from "@/types/project";

const page = async () => {
 const { data : projects} = await getAllProject()

  return (
    <div className="flex flex-wrap justify-center  gap-10">
      {projects?.map((p: TProject,idx : number) => (
       <ProjectCard key={idx} p={p}/>
      ))}
    </div>
  );
};

export default page;
