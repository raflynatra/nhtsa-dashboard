import { LoginForm } from "@/features/auth";
import PublicLayout from "@/layout/PublicLayout";
import type { FC } from "react";

const LoginPage: FC = () => {
  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  );
};

export default LoginPage;
