/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createExperiance = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/Experiances`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("Experiance");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const allExperiances = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/Experiances`, {
      method: "GET",
      next: {
        tags: ["Experiance"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteExperiance = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/Experiances/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("Experiance");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
