import { QueryCache, QueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.meta?.errorMessage) message.error(`${query.meta.errorMessage}`);
    },
  }),
});
