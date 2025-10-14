import type { Account } from "../types";
import type { AddAccount } from "../schemas";
const apiUrl = import.meta.env.VITE_API_URL;

export default async function postAccount({
  userId,
  account,
  token,
}: {
  userId: string;
  token: string;
  account: AddAccount;
}): Promise<Account> {
  const response = await fetch(`${apiUrl}/users/${userId}/accounts`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}
