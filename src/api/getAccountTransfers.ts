const apiUrl = import.meta.env.VITE_API_URL;
/**
 * TODO: refactor to add apiURL by default, userId and token
 */
export default async function getPastOrders(
  userId: string,
  accountId: string,
  token: string,
) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/accounts/${accountId}/transfers`,
    {
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}
