/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { allskills } from "@/services/Skills";
import { ISkill } from "@/types/skill";
import NMImageUploader from "@/components/ui/core/NMImageUploader/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer/ImagePreviewer";
import { uploadFile } from "@/lib/uploadImage";

import { TProject } from "@/types/project";
import { updateProject } from "@/services/Projects";
interface ProjectFormValues {
  name: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  description: string;
  features: { value: string }[];
}
export default function UpdateProject({ project }: { project: TProject }) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    project?.imageUrl || []
  );
  const [skills, setSkills] = useState<ISkill[] | []>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: project?.name || "",
      liveUrl: project?.liveUrl || "",
      githubUrl: project?.githubUrl || "",
      tech: project?.tech?.map((t: ISkill) => t._id) || [],
      description: project?.description || "",
      features: project?.features?.map((f) => ({ value: f })) || [
        { value: "" },
      ],
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        tech: project.tech.map((t: ISkill) => t._id),
        description: project.description,
        features: project.features.map((f) => ({ value: f })),
      });
      setImagePreview(project.imageUrl);
    }
  }, [project]);
  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const addFeatures = () => {
    appendFeatures({ value: "" });
  };

  const fetchData = async () => {
    const skills = await allskills();

    setSkills(skills?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const existingImages = imagePreview.filter((url) => url.startsWith("http"));
    const newImages = await Promise.all(
      imageFiles.map((file) => uploadFile(file))
    );
    const allImages = [...existingImages, ...newImages];
    const features = data.features.map((f: { value: string }) => f.value);

    const projectData = {
      ...data,
      features,
      imageUrl: allImages,
      tech: data.tech,
    };

    try {
      const res = await updateProject(project._id, projectData);
      if (res.success) {
        toast.success(res.message);
        router.push("/manage-project");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-7xl mx-auto p-5 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <div className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-36 resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-5">
                <FormField
                  control={form.control}
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Live URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-5">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Guthub URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div className="flex justify-between items-center py-3 ">
                  <p className="text-primary font-bold text-xl">Images</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 ">
                  {imagePreview.length < 10 && (
                    <NMImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Image"
                    />
                  )}
                  <ImagePreviewer
                    className="grid grid-cols-12  gap-4"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-primary font-bold text-xl">
                    3 Key Features
                  </p>
                  <Button
                    onClick={addFeatures}
                    variant="outline"
                    className="size-10"
                    type="button"
                  >
                    <Plus className="text-primary" />
                  </Button>
                </div>

                <div className="my-5">
                  {featureFields.map((featureField, index) => (
                    <div key={featureField.id}>
                      <FormField
                        control={form.control}
                        name={`features.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="my-2">
                              Feature {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="tech"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Command className="rounded-lg border shadow-md">
                            <div className="flex items-center  w-full px-2">
                              <CommandInput
                                placeholder="Search tech..."
                                onFocus={() => setOpen(true)}
                                onBlur={() =>
                                  setTimeout(() => setOpen(false), 150)
                                }
                                onValueChange={(value) => {
                                  setSearchTerm(value);
                                  setOpen(value.trim().length > 0);
                                }}
                                className="h-11 flex-1 border-0 bg-transparent outline-none ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>

                            <div className="flex flex-wrap gap-1 p-2">
                              {field.value?.map((techId) => {
                                const tech = skills.find(
                                  (s) => s._id === techId
                                );
                                return (
                                  <Badge
                                    key={techId}
                                    variant="secondary"
                                    className="cursor-pointer hover:bg-red-100"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      field.onChange(
                                        field.value.filter(
                                          (id) => id !== techId
                                        )
                                      );
                                    }}
                                  >
                                    {tech?.title}
                                    <X className="ml-1 h-3 w-3" />
                                  </Badge>
                                );
                              })}
                            </div>
                            {open && (
                              <div className="absolute top-full left-0 w-full bg-white z-50 shadow-md rounded-b-lg max-h-64 overflow-y-auto">
                                <CommandList>
                                  <CommandGroup className="p-2">
                                    {skills
                                      .filter((skill) =>
                                        skill.title
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase())
                                      )
                                      .map((skill) => (
                                        <CommandItem
                                          key={skill._id}
                                          value={skill.title}
                                          onSelect={() => {
                                            const currentValues =
                                              field.value || [];
                                            if (
                                              !currentValues.includes(skill._id)
                                            ) {
                                              field.onChange([
                                                ...currentValues,
                                                skill._id,
                                              ]);
                                            }
                                            setOpen(false);
                                            setSearchTerm("");
                                          }}
                                          className="cursor-pointer aria-selected:bg-muted aria-selected:text-muted-foreground"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              field.value?.includes(skill._id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {skill.title}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </div>
                            )}
                          </Command>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
