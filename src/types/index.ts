export interface User {
  id: string;
  username: string;
  picture: string;
  token: string;
}

export interface Account {
  id: string;
  userId: string;
  nickname: string;
  asset: "XRP" | "BTC" | "ETH";
  address: string;
  transferLimit: number;
  balance: number;
  createdAt: string;
  lastDeposit: string;
  lastTransfer: string;
}

export interface GetAccountsResponse {
  accounts: Array<Account>;
}
