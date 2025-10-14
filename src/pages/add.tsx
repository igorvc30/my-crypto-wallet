import type { FormProps } from "antd";
import { Typography, Card, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { AddAccountForm } from "../components/AddAccountForm";

import postAccounts from "../api/postAccounts";
import { useAuth } from "../context/auth";
import type { AddAccount } from "../schemas";
import { formatErrorMessage } from "../utils";

const { Title } = Typography;

export default function AddAccountPage() {
  const { user } = useAuth();

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
    <Card
      style={{
        borderColor: "#143720",
        borderWidth: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2} style={{ color: "#143720" }}>
          Add New Account
        </Title>
      </div>
      <AddAccountForm onFinish={onFinish} isPending={isPending} error={error} />
    </Card>
  );
}
