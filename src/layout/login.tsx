import { Layout } from "antd";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  justifyContent: "center",
  alignContent: "center",
};

const layoutStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "inherit",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
}
