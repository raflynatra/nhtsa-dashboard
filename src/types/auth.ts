export type Role = "admin" | "viewer";

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface LoginFormValues {
  username: string;
  password: string;
}
