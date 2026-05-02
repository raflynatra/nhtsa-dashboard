export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP ${response.status}: ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
};
