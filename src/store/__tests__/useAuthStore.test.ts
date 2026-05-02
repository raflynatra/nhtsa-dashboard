import { useAuthStore } from "@/store/useAuthStore";

beforeEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
  localStorage.clear();
});

describe("useAuthStore", () => {
  describe("login", () => {
    it("returns true and sets authenticated state for valid admin credentials", () => {
      const result = useAuthStore
        .getState()
        .login({ username: "admin", password: "admin123" });

      expect(result).toBe(true);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user).toMatchObject({
        username: "admin",
        role: "admin",
      });
    });

    it("returns true and sets authenticated state for valid viewer credentials", () => {
      const result = useAuthStore
        .getState()
        .login({ username: "viewer", password: "viewer123" });

      expect(result).toBe(true);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user).toMatchObject({
        username: "viewer",
        role: "viewer",
      });
    });

    it("returns false and stays unauthenticated for wrong password", () => {
      const result = useAuthStore
        .getState()
        .login({ username: "admin", password: "wrong" });

      expect(result).toBe(false);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();
    });

    it("returns false and stays unauthenticated for unknown username", () => {
      const result = useAuthStore
        .getState()
        .login({ username: "unknown", password: "admin123" });

      expect(result).toBe(false);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe("logout", () => {
    it("clears user and sets isAuthenticated to false", () => {
      useAuthStore
        .getState()
        .login({ username: "admin", password: "admin123" });
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      useAuthStore.getState().logout();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().user).toBeNull();
    });
  });
});
