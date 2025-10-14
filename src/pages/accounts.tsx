import { useEffect, useState } from "react";
import { Button, List, Modal } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import AccountListItem from "../components/AccountListItem";
import AccountTransferListItem from "../components/AccountTransferListItem";

import getAccounts from "../api/getAccounts";
import getAccountTransfers from "../api/getAccountTransfers";
import { useAuth } from "../context/auth";

import type {
  Account,
  GetAccountsResponse,
  GetAccountsTransfersResponse,
} from "../types";

export default function AccountsPage() {
  const [page, setPage] = useState(0);
  const [list, setList] = useState<Array<Account>>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const { user } = useAuth();
  const { data: accountsData, isLoading: isLoadingAccounts } =
    useQuery<GetAccountsResponse>({
      queryKey: ["get-accounts", page],
      queryFn: () => getAccounts(user?.id!, page, user?.token!),
      enabled: !!user,
      staleTime: Infinity,
      placeholderData: keepPreviousData,
    });

  const { data: accountTransfersData, isLoading: isLoadingAccountTransfers } =
    useQuery<GetAccountsTransfersResponse>({
      queryKey: ["get-account-transfers", selectedAccountId],
      queryFn: () =>
        getAccountTransfers(user?.id!, selectedAccountId, user?.token!),
      enabled: !!selectedAccountId,
      staleTime: Infinity,
    });

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (accountsData && accountsData.accounts) {
      setList((prevState) =>
        [...prevState, ...accountsData.accounts].sort(
          (a, b) =>
            new Date(a.lastTransfer).getDate() -
            new Date(b.lastTransfer).getDate(),
        ),
      );
    }
  }, [accountsData]);

  const loadMore = !isLoadingAccounts ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>load more</Button>
    </div>
  ) : null;

  const showModal = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleCancel = () => {
    setSelectedAccountId("");
  };

  if (isLoadingAccounts) {
    return <h1>LOADING</h1>;
  }

  const selectedAccount = list.find((item) => item.id);

  return (
    <>
      <List
        itemLayout="vertical"
        size="small"
        dataSource={list}
        footer={loadMore}
        renderItem={(item) => (
          <AccountListItem item={item} onClick={showModal} />
        )}
      />

      <Modal
        title={`Transfer Log - ${selectedAccount?.nickname}`}
        open={!!selectedAccountId}
        onCancel={handleCancel}
        footer={null}
      >
        {isLoadingAccountTransfers ? (
          <h1>LOADING</h1>
        ) : (
          <List
            itemLayout="vertical"
            size="default"
            dataSource={accountTransfersData?.transfers}
            renderItem={(item) => (
              <AccountTransferListItem
                item={item}
                isCredit={selectedAccountId === item.to.accountId}
              />
            )}
          />
        )}
      </Modal>
    </>
  );
}
