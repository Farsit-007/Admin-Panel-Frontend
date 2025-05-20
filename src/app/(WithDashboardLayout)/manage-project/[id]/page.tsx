import { getSingleProject } from "@/services/Projects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ISkill } from "@/types/skill";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: project } = await getSingleProject(id);
  return (
    <div className="  px-4 py-10">
      <div className=" mx-auto space-y-12">
        <div className="relative group">
          <Carousel className="w-full">
            <CarouselContent>
              {project.imageUrl.map((img: string, index: number) => (
                <CarouselItem key={`carousel-${index}`}>
                  <div className="p-1">
                    <AspectRatio ratio={16 / 5}>
                      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                        {img && (
                          <Image
                            src={img}
                            alt={`Project screenshot ${index + 1}`}
                            height={1000}
                            width={2400}
                            className="h-full w-full object-cover transform transition-transform duration-300 "
                          />
                        )}
                      
                      </div>
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="right-4 h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="space-y-8 order-1">
          
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {project.name}
              <span className="text-blue-600 animate-pulse">.</span>
            </h1>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Project Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project?.tech?.map((technology: ISkill) => (
                  <div
                    key={`tech-${technology._id}`}
                    className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 mr-4">
                      {technology.imageUrl && (
                        <Image
                          src={technology.imageUrl}
                          alt={technology.title || "Technology logo"}
                          width={1000}
                          height={1000}
                          className="h-12 w-12 object-contain"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-2">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg h-full">
              <CardHeader>
                <h2 className="text-3xl font-bold text-gray-900">
                  Key Features
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.features.map((feature: string, index: number) => (
                  <div
                    key={`feature-${index}`}
                    className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-lg">✓</span>
                    </div>
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
