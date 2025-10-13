import { List, Typography } from "antd";
import {
  getFormattedAmount,
  getFormattedFullDate,
  getTimeFromNow,
} from "../utils";
import type { Account } from "../types";

import { ExchangeRates } from "../constants";

export default function AccountListItem({ item }: { item: Account }) {
  return (
    <List.Item
      key={item.id}
      actions={[
        <span>Created at {getFormattedFullDate(item.createdAt)}</span>,
        <span>Last deposit {getTimeFromNow(item.lastDeposit)}</span>,
        <span>Last transfer {item.lastTransfer}</span>,
      ]}
      extra={
        <div style={{ paddingLeft: 8 }}>
          <p style={{ fontSize: 18, color: "#143720", fontWeight: "bold" }}>
            {getFormattedAmount({
              currency: item.asset,
              value: item.balance,
            })}
          </p>
          <p>
            {getFormattedAmount({
              currency: "BRL",
              value: ExchangeRates[`${item.asset}BRL`] * item.balance,
            })}
          </p>
          <p>
            {getFormattedAmount({
              currency: "USD",
              value: ExchangeRates[`${item.asset}USD`] * item.balance,
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
        description={item.address}
      />

      <Typography.Text strong>
        Transfer Limit:{" "}
        {getFormattedAmount({
          currency: item.asset,
          value: item.transferLimit,
        })}
      </Typography.Text>
    </List.Item>
  );
}
