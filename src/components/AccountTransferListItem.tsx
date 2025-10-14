import { Avatar, List, Tag, Typography } from "antd";
import {
  FallOutlined,
  RiseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getFormattedAmount, getFormattedDate } from "../utils";
import type { AccountTransfer } from "../types";
const { Text } = Typography;
import { ExchangeRates } from "../constants";

export default function AccountListItem({
  item,
  isCredit,
}: {
  item: AccountTransfer;
  isCredit: boolean;
}) {
  const icon = isCredit ? (
    <FallOutlined style={{ color: "#143720" }} />
  ) : (
    <RiseOutlined style={{ color: "red" }} />
  );
  const description = isCredit
    ? `Received from ${item.from.username}`
    : `Sent to ${item.to.username}`;
  const sign = isCredit ? "+" : "-";
  return (
    <List.Item key={item.id}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Avatar icon={icon} size={32} style={{ background: "#d5fdd3" }} />
          <Text strong style={{ marginLeft: 8 }}>
            {description}
          </Text>
        </div>
        <img width={32} height={32} alt="logo" src={`/${item.asset}.svg`} />
      </div>
      <Text strong>Wallet address</Text>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tag color="#143720">{item.from.address}</Tag>
        <ArrowRightOutlined style={{ marginRight: 8 }} />
        <Tag color="#143720">{item.to.address}</Tag>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong>Amount</Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{ color: "#143720", fontWeight: "bold" }}
          >{`${sign}${item.amount} ${item.asset}`}</span>
          <span>
            {sign +
              getFormattedAmount({
                currency: "USD",
                value: ExchangeRates[`${item.asset}USD`] * item.amount,
              })}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong>Date</Text>
        <span>{getFormattedDate(item.createdAt)}</span>
      </div>
    </List.Item>
  );
}
