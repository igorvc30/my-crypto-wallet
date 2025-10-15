const apiUrl = import.meta.env.VITE_API_URL;
/**
 * TODO: refactor to add apiURL by default, userId and token
 */
export default async function getAccountsByAsset(token: string, asset: string) {
  const response = await fetch(`${apiUrl}/accounts?asset=${asset}`, {
    headers: {
      Authorization: token!,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
