import { Avatar, Layout, Typography, Dropdown, Space } from "antd";
import { useAuth } from "../context/auth";
const { Title } = Typography;

export default function Header() {
  const { user, logout } = useAuth();

  const items = [
    {
      label: "Logout",
      key: "1",
    },
  ];
  return (
    <Layout.Header style={headerStyle}>
      <span style={{ fontSize: 24, color: "#d5fdd3" }}>0#</span>
      <Title style={{ color: "white" }} level={3}>
        Zero Hash Wallet
      </Title>
      <div>
        <Dropdown menu={{ items, onClick: logout }}>
          <a onClick={(e) => e.preventDefault()} style={{ color: "white" }}>
            <Space>
              {user?.username}
              <Avatar
                size={{ xs: 24, sm: 32, md: 40 }}
                src={<img draggable={false} src={user?.picture} alt="avatar" />}
              />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Layout.Header>
  );
}

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  background: "#143720 ",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
