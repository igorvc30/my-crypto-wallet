import { useEffect, useMemo, useState } from "react";
import { Button, List, Skeleton } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import AccountListItem from "../components/AccountListItem";
import getAccounts from "../api/getAccounts";
import { useAuth } from "../context/auth";

import type { Account, GetAccountsResponse } from "../types";

export default function AccountsPage() {
  const [page, setPage] = useState(0);
  const [list, setList] = useState<Array<Account>>([]);
  const { user } = useAuth();
  const { data, isLoading } = useQuery<GetAccountsResponse>({
    queryKey: ["get-accounts", page],
    queryFn: () => getAccounts(page, user?.id!, user?.token!),
    enabled: !!user,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  const onLoadMore = () => {
    // getAccounts(page + 1, user?.id!, user?.token!);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (data && data.accounts) {
      setList((prevState) =>
        [...prevState, ...data.accounts].sort(
          (a, b) =>
            new Date(a.lastTransfer).getDate() -
            new Date(b.lastTransfer).getDate(),
        ),
      );
    }
  }, [data]);

  const loadMore =
    !isLoading && true ? (
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

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={list}
      footer={loadMore}
      renderItem={(item) => <AccountListItem item={item} />}
    />
  );
}
