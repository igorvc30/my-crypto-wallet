import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// extract the inferred type
export type Login = z.infer<typeof LoginSchema>;

export const AccountSchema = z.object({
  nickname: z.string(),
  asset: z.string(),
  address: z.string(),
  transferLimit: z.string(),
});

// extract the inferred type
export type AddAccount = z.infer<typeof AccountSchema>;
