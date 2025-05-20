import { z } from "zod";
export const passwordChangeSchema = z.object({
    oldPassword : z.string({required_error : "Old Password is required"}).min(5,"Must be at least 5 character"),
    newPassword : z.string({required_error : "New Password is required"}).min(5,"Must be at least 5 character"),
    confirmPassword : z.string({required_error : "COnfirm Password is required"}).min(5,"Must be at least 5 character")
})