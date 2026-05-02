import { cn, debounce } from "@/lib/utils";
import { Input, type InputProps } from "antd";
import { Search } from "lucide-react";
import type { FC } from "react";

interface SearchInputProps extends Omit<InputProps, "onChange"> {
  onSearch: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  wrapperClassName,
  ...props
}: SearchInputProps) => {
  const handleChange: InputProps["onChange"] = (e) => {
    debounce(() => {
      onSearch(e);
    }, 250);
  };

  return (
    <div
      className={cn(
        "p-2 flex flex-col gap-2 w-full md:w-1/3",
        wrapperClassName,
      )}
    >
      <Input
        size="large"
        prefix={<Search size={14} />}
        onChange={handleChange}
        allowClear
        {...props}
      />
    </div>
  );
};
