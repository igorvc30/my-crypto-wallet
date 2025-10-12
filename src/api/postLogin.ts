import type { User } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export default async function postLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${apiUrl}/logins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}
