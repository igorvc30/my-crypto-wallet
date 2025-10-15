import type { TransferAccountDetails } from "../schemas";
const apiUrl = import.meta.env.VITE_API_URL;

export default async function postAccountTransfer({
  userId,
  token,
  fromAccountId,
  transferDetails,
}: {
  userId: string;
  token: string;
  fromAccountId: string;
  transferDetails: TransferAccountDetails;
}): Promise<{ id: string }> {
  const response = await fetch(
    `${apiUrl}/users/${userId}/accounts/${fromAccountId}/transfers`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferDetails),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}
