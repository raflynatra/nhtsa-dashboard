import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Button, Form, Input } from "antd";
import type { LoginFormValues } from "@/types/auth";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const res = login(values);

    if (!res) {
      setError("Invalid username or password");
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h1>
      <p className="text-sm text-gray-500 mb-6">NHTSA Dashboard</p>

      <Form
        requiredMark="optional"
        layout="vertical"
        onFinish={onSubmit}
        className="space-y-4"
      >
        <Form.Item
          rules={[{ required: true, message: "Username is required" }]}
          label="Username"
          name="username"
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Password is required" }]}
          label="Password"
          name="password"
        >
          <Input.Password size="large" />
        </Form.Item>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Sign in
        </Button>
      </Form>
    </>
  );
};
