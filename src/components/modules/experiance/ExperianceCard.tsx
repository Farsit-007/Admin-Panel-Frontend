import { IExperiance } from "@/types/skill";
import DeleteModal from "./DeleteModal";

const ExperienceCard = ({ Experiance }: { Experiance: IExperiance }) => {
  return (
    <div className="w-64 p-4 rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative group">
    
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {Experiance.designation}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {Experiance.date}
        </p>
      </div>

     
      <p className="text-sm text-gray-600 line-clamp-3">
        {Experiance.description}
      </p>

      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteModal id={Experiance._id as string} />
      </div>
    </div>
  );
};

export default ExperienceCard;