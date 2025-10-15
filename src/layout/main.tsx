import { Layout } from "antd";
import Header from "../components/Header";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
  flex: 1,
};

const layoutStyle = {
  borderRadius: 8,
  display: "flex",
  backgroundColor: "inherit",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content style={contentStyle}>
        <div
          style={{
            flex: 1,
            maxWidth: 800,
            background: "white",
            borderRadius: 8,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
