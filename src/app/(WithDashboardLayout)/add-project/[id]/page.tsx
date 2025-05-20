import UpdateProject from "@/components/modules/project/UpdateProject";
import { getSingleProject } from "@/services/Projects";

const page = async ({params}: {params : Promise<{id : string}>}) => {
    const {id} = await params
    const { data: project } = await getSingleProject(id);
  return (
    <div className="">
      <UpdateProject project={project}/>
    </div>
  );
};

export default page;
