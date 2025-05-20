/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "@/lib/verifyToken";
import { jwtDecode } from "jwt-decode";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    revalidatePath("USER");
    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success) {
      storeCookies.set("token", result?.data?.token);
      storeCookies.set("refreshToken", result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")?.value;
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
  } else {
    return null;
  }
  return decodedData;
};

export const logout = async () => {
  (await cookies()).delete("token");
  (await cookies()).delete("refreshToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );
    revalidateTag("USER");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMe = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["USER"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (userData: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      }
    );
    revalidateTag("USER");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changePassword = async (userData: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(userData),
      }
    );
    revalidateTag("USER");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
