import { List, Typography } from "antd";
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
  onClick,
}: {
  item: Omit<Account, "userId">;
  onClick?: (accountId: string) => void;
}) {
  const handleItemClick = () => {
    onClick?.(item.id);
  };

  return (
    <List.Item
      key={item.id}
      onClick={handleItemClick}
      style={onClick ? { cursor: "pointer" } : {}}
      actions={[
        <span>Created at {getFormattedFullDate(item.createdAt)}</span>,
        item.lastDeposit && (
          <span>Last deposit {getTimeFromNow(item.lastDeposit)}</span>
        ),
        item.lastTransfer && (
          <span>Last transfer {getTimeFromNow(item.lastTransfer)}</span>
        ),
      ]}
      extra={
        <div
          style={{
            paddingLeft: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <p style={{ fontSize: 18, color: "#143720", fontWeight: "bold" }}>
            {`${item.balance} ${item.asset}`}
          </p>
          <p>
            {getFormattedAmount({
              currency: "BRL",
              value: EXCHANGE_RATES[`${item.asset}BRL`] * item.balance,
            })}
          </p>
          <p>
            {getFormattedAmount({
              currency: "USD",
              value: EXCHANGE_RATES[`${item.asset}USD`] * item.balance,
            })}
          </p>
        </div>
      }
    >
      <List.Item.Meta
        avatar={
          <img width={48} height={48} alt="logo" src={`/${item.asset}.svg`} />
        }
        title={item.nickname}
        description={<Text copyable>{item.address}</Text>}
      />

      <Text strong>
        {`Transfer Limit: ${item.transferLimit} ${item.asset}`}
      </Text>
    </List.Item>
  );
}
