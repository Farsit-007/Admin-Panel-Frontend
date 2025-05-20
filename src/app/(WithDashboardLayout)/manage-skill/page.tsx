import SKillCard from "@/components/modules/skill/SKillCard";
import { allskills } from "@/services/Skills";
import { ISkill } from "@/types/skill";

const page = async () => {
  const { data: skills } = await allskills();
  return (
    <div className="flex flex-wrap gap-5">
      {skills.map((skill: ISkill) => (
        <SKillCard key={skill._id} skill={skill} />
      ))}
    </div>
  );
};

export default page;
