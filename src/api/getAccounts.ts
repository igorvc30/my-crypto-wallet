const apiUrl = import.meta.env.VITE_API_URL;
/**
 * TODO: refactor to add apiURL by default, userId and token
 */
export default async function getPastOrders(
  page: number,
  userId: string,
  token: string,
) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/accounts?page=${page}`,
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
