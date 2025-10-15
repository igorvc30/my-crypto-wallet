import { Button, Form, Typography, Select, InputNumber } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import SelectTransferAccountItem from "./SelectTransferAccountItem";

import { formatErrorMessage } from "../utils";
import { ASSETS_AVAILABLE } from "../constants";
import type { Account } from "../types";
import type { TransferAccountDetails } from "../schemas";

const { Text } = Typography;

type Props = {
  onFinish: ((values: TransferAccountDetails) => void) | undefined;
  isPending: boolean;
  error: Error | null;
  accounts?: Array<Account>;
  selectedAccount?: Account;
  isLoading: boolean;
};

export default function AccountTransferForm({
  onFinish,
  isPending,
  error,
  selectedAccount,
  accounts,
  isLoading,
}: Props) {
  const navigate = useNavigate();
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ from: selectedAccount?.id }}
    >
      <Form.Item<TransferAccountDetails> label="Selected account" name="from">
        <Select
          variant="borderless"
          optionLabelProp="label"
          value={selectedAccount?.id}
          disabled
          loading={isLoading}
          options={[
            {
              label: <SelectTransferAccountItem item={selectedAccount!} />,
              value: selectedAccount?.id,
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item<TransferAccountDetails> label="Asset">
        <Select
          defaultValue={selectedAccount?.asset}
          options={selectOptions}
          disabled
        />
      </Form.Item>
      <Form.Item<TransferAccountDetails>
        label="Recipient account"
        name="to"
        rules={[
          { required: true, message: "Please select a recipient account!" },
        ]}
      >
        <Select
          variant="borderless"
          placeholder="Please select recipient account"
          optionLabelProp="label"
          loading={isLoading}
          options={accounts?.map((item) => ({
            label: <SelectTransferAccountItem item={item} />,
            value: item.id,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item<TransferAccountDetails>
        label="Transfer amount: "
        name="amount"
        validateTrigger="onChange"
        rules={[
          { required: true, message: "Please input transfer limit!" },
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just number",
          },
          () => ({
            validator(_, value) {
              if (!value || !selectedAccount?.transferLimit) {
                return Promise.reject();
              }
              if (isNaN(value)) {
                return Promise.reject("Zip code has to be a number.");
              }
              if (Number(value) > selectedAccount.transferLimit) {
                return Promise.reject(
                  "Maximum transfer limit exceed, please reduce the transfer amount.",
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <InputNumber type="number" min={0} max={1000} />
      </Form.Item>

      <div style={{ display: "flex", gap: 20 }}>
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
        </Button>
        <Button
          type="primary"
          style={{ background: "#143720" }}
          htmlType="submit"
          loading={isPending}
          block
        >
          Confirm
        </Button>
      </div>
      {error && (
        <Text type="danger">
          Please, double check your form. It's {formatErrorMessage(error)}
        </Text>
      )}
    </Form>
  );
}

const selectOptions = ASSETS_AVAILABLE.map((asset) => ({
  value: asset,
  label: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img width={20} height={20} alt="logo" src={`/${asset}.svg`} />
      <span style={{ marginLeft: 8 }}>{asset}</span>
    </div>
  ),
}));
