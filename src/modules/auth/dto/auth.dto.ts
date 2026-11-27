import { z } from "zod";

export const registerDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    userName: z.string().trim().min(2).max(25),
    password: z.string().trim().min(6).max(16),
    dateOfBirth: z.date().optional(),
    gender: z.enum(["male", "female"]).default("male"),
}).strict();

export type RegisterSchema = z.infer<typeof registerDTO>;

export const loginDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().trim().min(6).max(16),
}).strict();

export type LoginSchema = z.infer<typeof loginDTO>;

export const verifyAccountDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    code: z.string().trim().length(6),
}).strict();


export const resetPasswordDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    code: z.string().trim().length(6),
    newPassword: z.string().trim().min(6).max(16),
}).strict();
export const sendOTPDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
}).strict();


export const enable2StepVerificationDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    code: z.string().trim().length(6),
}).strict();

