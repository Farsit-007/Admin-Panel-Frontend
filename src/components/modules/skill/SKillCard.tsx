import { ISkill } from "@/types/skill";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition relative group">
      <div className="relative w-full h-full">
        <Image
          src={skill.imageUrl}
          alt={skill.title}
          fill
          className="object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-50 text-black text-xs font-semibold text-center py-1">
          {skill.title}
        </div>

        <DeleteModal id={skill._id as string} />
      </div>
    </div>
  );
};

export default SkillCard;
