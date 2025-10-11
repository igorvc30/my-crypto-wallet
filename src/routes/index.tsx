import { createFileRoute } from "@tanstack/react-router";
import { Typography, Button } from "antd";

const { Title } = Typography;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <Title level={1}>Zero Hash Challenge </Title>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
