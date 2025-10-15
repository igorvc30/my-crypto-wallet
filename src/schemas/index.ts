import * as z from "zod";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Login = z.infer<typeof LoginSchema>;

const AccountSchema = z.object({
  nickname: z.string(),
  asset: z.string(),
  address: z.string(),
  transferLimit: z.string(),
});

export type AddAccount = z.infer<typeof AccountSchema>;

const TransferAccountDetailsSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number(),
});

export type TransferAccountDetails = z.infer<
  typeof TransferAccountDetailsSchema
>;
