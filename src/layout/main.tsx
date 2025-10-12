import { Layout } from "antd";
import Header from "../components/Header";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  display: "flex",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
}
