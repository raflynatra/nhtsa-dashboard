import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

let timer: ReturnType<typeof setTimeout>;
export const debounce = (fn: () => void, delay: number): void => {
  try {
    return ((): void => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(), delay);
    })();
  } catch (error) {
    throw new Error("Something went wrong during debounce", { cause: error });
  }
};
