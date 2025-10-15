import { Typography } from "antd";

import type { Account } from "../types";

const { Text } = Typography;

export default function SelectTransferAccountItem({ item }: { item: Account }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img width={32} height={32} alt="logo" src={`/${item.asset}.svg`} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 12,

            flexWrap: "wrap",
          }}
        >
          <Text className="test">{item.nickname}</Text>
          <Text className="test" strong>
            {item.address}
          </Text>
        </div>
      </div>
      <Text strong>
        {`Transfer Limit: ${item.transferLimit} ${item.asset}`}
      </Text>
    </div>
  );
}
