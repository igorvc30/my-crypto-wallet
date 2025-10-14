import { useRouteContext, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography, Card } from "antd";
import type { Login } from "../schemas";

const { Title } = Typography;

export default function LoginPage() {
  const context = useRouteContext({ from: "/login" });

  const { auth } = context;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish: FormProps<Login>["onFinish"] = async ({
    password,
    username,
  }: Login) => {
    setIsLoading(true);
    setError("");

    try {
      await auth.login({ username, password });
      // Navigate to the redirect URL using router navigation
      navigate({ to: "/" });
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<Login>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card style={{ width: 500, borderColor: "#143720", borderWidth: 1 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2} style={{ color: "#143720" }}>
          Login
        </Title>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ username: "maryjane", password: "secure456" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<Login>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<Login>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          style={{ background: "#143720" }}
          block
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
}
