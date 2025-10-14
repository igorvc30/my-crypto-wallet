type Asset = "XRP" | "BTC" | "ETH";
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
  asset: Asset;
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

interface AccountDetails {
  accountId: string;
  username: string;
  address: string;
}
export interface AccountTransfer {
  id: string;
  amount: number;
  asset: Asset;
  from: AccountDetails;
  to: AccountDetails;
  createdAt: string;
}
export interface GetAccountsTransfersResponse {
  transfers: Array<AccountTransfer>;
}
