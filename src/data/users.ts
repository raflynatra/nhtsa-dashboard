import type { User } from "@/types/auth";

interface Credential extends User {
  password: string;
}

export const USERS: Credential[] = [
  { id: "1", username: "admin", password: "admin123", role: "admin" },
  { id: "2", username: "viewer", password: "viewer123", role: "viewer" },
];
