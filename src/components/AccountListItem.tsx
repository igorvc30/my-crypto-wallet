import { Button, List, Typography } from "antd";
import { HistoryOutlined, SendOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

import {
  getFormattedAmount,
  getFormattedFullDate,
  getTimeFromNow,
} from "../utils";
import type { Account } from "../types";

import { EXCHANGE_RATES } from "../constants";
const { Text } = Typography;

export default function AccountListItem({
  item,
  showTransferLog,
}: {
  item: Omit<Account, "userId">;
  showTransferLog?: (accountId: string) => void;
}) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    showTransferLog?.(item.id);
  };

  const handleTransfer = () => {
    navigate({
      to: "/transfer/$accountId",
      params: { accountId: item.id },
      search: { asset: item.asset },
    });
  };

  return (
    <List.Item
      key={item.id}
      extra={
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p style={{ fontSize: 18, color: "#143720", fontWeight: "bold" }}>
              {`${item.balance} ${item.asset}`}
            </p>
            <span>
              {getFormattedAmount({
                currency: "BRL",
                value: EXCHANGE_RATES[`${item.asset}BRL`] * item.balance,
              })}
            </span>
            <span>
              {getFormattedAmount({
                currency: "USD",
                value: EXCHANGE_RATES[`${item.asset}USD`] * item.balance,
              })}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {item.balance && (
              <Button
                icon={<SendOutlined />}
                type="primary"
                style={{ background: "#143720" }}
                onClick={handleTransfer}
              >
                Transfer Tokens
              </Button>
            )}
            {showTransferLog && (
              <Button
                icon={<HistoryOutlined />}
                type="primary"
                ghost
                onClick={handleItemClick}
              >
                Transfer Log
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <List.Item.Meta
            avatar={
              <img
                width={48}
                height={48}
                alt="logo"
                src={`/${item.asset}.svg`}
              />
            }
            title={item.nickname}
            description={<Text copyable>{item.address}</Text>}
          />
          <Text strong>
            {`Transfer Limit: ${item.transferLimit} ${item.asset}`}
          </Text>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong italic>
              Created at {getFormattedFullDate(item.createdAt)}
            </Text>
            {item.lastDeposit && (
              <Text italic>
                Last deposit {getTimeFromNow(item.lastDeposit)}
              </Text>
            )}
            {item.lastTransfer && (
              <Text italic>
                Last transfer {getTimeFromNow(item.lastTransfer)}
              </Text>
            )}
          </div>
        </div>
      </div>
    </List.Item>
  );
}
