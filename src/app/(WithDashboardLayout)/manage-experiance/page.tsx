import ExperienceCard from "@/components/modules/experiance/ExperianceCard";
import { allExperiances } from "@/services/Experiance";
import { IExperiance } from "@/types/skill";

const page = async () => {
     const { data: Experiance } = await allExperiances();
  return (
    <div className="flex flex-wrap gap-5">
      {Experiance.map((Experiance: IExperiance) => (
        <ExperienceCard key={Experiance._id} Experiance={Experiance} />
      ))}
    </div>
  );
};

export default page;
