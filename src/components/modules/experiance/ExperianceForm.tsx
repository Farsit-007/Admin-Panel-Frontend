"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ExperianceValidationSchema } from "./ExperianceSchema";
import { createExperiance } from "@/services/Experiance";
const CreateExperiance = () => {
 
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(ExperianceValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const modifiedData = {
      ...data,
     
    };
    try {
      const res = await createExperiance(modifiedData);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push(`/manage-experiance`);
       
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
      <div className="flex items-center space-x-4 mb-5">
        <div>
          <h1 className="text-xl font-semibold">Add Experiances</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
          </div>
          <Button type="submit" className="w-full my-5" >
            {isSubmitting ? "Creating Experiance..." : "Create Experiance"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateExperiance;
