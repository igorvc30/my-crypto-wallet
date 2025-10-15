import { Typography, notification, List, Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HomeOutlined } from "@ant-design/icons";

import { AddAccountForm } from "../components/AddAccountForm";
import AccountListItem from "../components/AccountListItem";
import postAccounts from "../api/postAccounts";
import { useAuth } from "../context/auth";
import { formatErrorMessage } from "../utils";

import type { FormProps } from "antd";
import type { AddAccount } from "../schemas";

const { Title } = Typography;

export default function AddAccountPage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { data, mutate, isPending, error } = useMutation({
    mutationFn: postAccounts,
    onError(error) {
      notification.error({
        duration: 8,
        showProgress: true,
        pauseOnHover: true,
        message: "Unable to create account",
        description: `Sorry, we couldn't create your account. It's ${formatErrorMessage(error)}`,
      });
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log(JSON.stringify({ data, variables, onMutateResult, context }));
      notification.success({
        duration: 8,
        showProgress: true,
        pauseOnHover: true,
        message: "New account created!",
        description: `Your ${data.asset} was created, you can use ${data.nickname} right now!`,
      });
    },
  });

  const onFinish: FormProps<AddAccount>["onFinish"] = async ({
    address,
    asset,
    nickname,
    transferLimit,
  }: AddAccount) => {
    mutate({
      userId: user?.id!,
      token: user?.token!,
      account: { address, asset, nickname, transferLimit },
    });
    console.log({ address, asset, nickname, transferLimit });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ alignSelf: "center" }}>
        <Title level={2} style={{ color: "#143720" }}>
          {data ? "New account created " : "Add new account"}
        </Title>
      </div>
      {data ? (
        <>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={[data]}
            renderItem={(item) => <AccountListItem item={item} />}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: 24,
            }}
          >
            <Button
              style={{ width: "50%" }}
              icon={<HomeOutlined />}
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
            >
              Go home
            </Button>
          </div>
        </>
      ) : (
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
          <AddAccountForm
            onFinish={onFinish}
            isPending={isPending}
            error={error}
          />
        </div>
      )}
    </div>
  );
}
