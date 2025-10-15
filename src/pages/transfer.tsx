import { notification, Typography, Result, Button } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearch, useParams, useNavigate } from "@tanstack/react-router";
import { HomeOutlined } from "@ant-design/icons";

import AccountTransferForm from "../components/AccountTransferForm";

import getAccountsByAsset from "../api/getAccountsByAsset";
import postAccountTransfer from "../api/postAccountTransfer";
import { useAuth } from "../context/auth";
import { formatErrorMessage } from "../utils";

import type { GetAccountsResponse } from "../types";
import type { FormProps } from "antd";
import type { TransferAccountDetails } from "../schemas";

const { Text, Title } = Typography;

export default function TransferPage() {
  const navigate = useNavigate();
  const { accountId } = useParams({
    from: "/(authenticated)/transfer/$accountId",
  });
  const search: { asset: string } = useSearch({
    from: "/(authenticated)/transfer/$accountId",
  });
  const { user } = useAuth();

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery<GetAccountsResponse>({
    queryKey: ["get-accounts-asset", search?.asset],
    queryFn: () => getAccountsByAsset(user?.token!, search?.asset),
    staleTime: Infinity,
    enabled: !!user,
  });

  const selectedAccount = data?.accounts?.find((item) => item.id === accountId);
  const accountsAvailable = data?.accounts?.filter(
    (item) => item.id !== accountId || item.asset !== selectedAccount?.asset,
  );

  const {
    data: transferResponse,
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: postAccountTransfer,
    onError(error) {
      notification.error({
        duration: 8,
        showProgress: true,
        pauseOnHover: true,
        message: "Unable to create account",
        description: `Sorry, we couldn't create your account. It's ${formatErrorMessage(error)}`,
      });
    },
    onSuccess() {
      notification.success({
        duration: 8,
        showProgress: true,
        pauseOnHover: true,
        message: "Account transfer successful!",
        description: `Your transfer was completed!`,
      });
    },
  });

  const onFinish: FormProps<TransferAccountDetails>["onFinish"] = async ({
    amount,
    from,
    to,
  }: TransferAccountDetails) => {
    mutate({
      userId: user?.id!,
      token: user?.token!,
      fromAccountId: from,
      transferDetails: { amount, from, to },
    });

    console.log({ amount, from, to });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
      }}
    >
      <div style={{ alignSelf: "center" }}>
        <Title level={2} style={{ color: "#143720" }}>
          {`Transfer ${selectedAccount?.asset} from account ${selectedAccount?.nickname}`}
        </Title>
      </div>
      {transferResponse?.id ? (
        <Result
          style={{ paddingBottom: 0 }}
          status="success"
          title="Account transfer completed successfully!"
          subTitle={`Transaction id: ${transferResponse.id}`}
          extra={[
            <Button
              block
              icon={<HomeOutlined />}
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
            >
              Go home
            </Button>,
          ]}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Text
              strong
            >{`Account balance: ${selectedAccount?.balance} ${selectedAccount?.asset}`}</Text>
          </div>
          {accountsAvailable && selectedAccount && (
            <AccountTransferForm
              accounts={accountsAvailable}
              isLoading={isLoading}
              error={mutationError}
              selectedAccount={selectedAccount}
              isPending={isPending}
              onFinish={onFinish}
            />
          )}
          {queryError && (
            <Text type="danger">{formatErrorMessage(queryError)}</Text>
          )}
        </>
      )}
    </div>
  );
}
