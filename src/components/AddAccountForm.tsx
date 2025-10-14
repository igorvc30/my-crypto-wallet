import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
} from "antd";
import type { InputNumberProps } from "antd";
import type { AddAccount } from "../schemas";
import { formatErrorMessage } from "../utils";
import { ASSETS_AVAILABLE } from "../constants";
const { Text } = Typography;

type Props = {
  onFinish: ((values: AddAccount) => void) | undefined;
  isPending: boolean;
  error: Error | null;
};

export function AddAccountForm({ onFinish, isPending, error }: Props) {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<AddAccount>
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: "Please input account nickname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<AddAccount>
        label="Asset"
        name="asset"
        rules={[{ required: true, message: "Please select account asset!" }]}
      >
        <Select options={selectOptions} />
      </Form.Item>

      <Form.Item<AddAccount>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input account address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<AddAccount>
        label="Transfer Limit"
        name="transferLimit"
        rules={[{ required: true, message: "Please input transfer limit!" }]}
      >
        <InputNumber min={0} max={1000} />
      </Form.Item>

      <Button
        type="primary"
        style={{ background: "#143720" }}
        block
        htmlType="submit"
        loading={isPending}
      >
        Submit
      </Button>
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
