import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextField({ label, value, onChange, type = "text", ...props }: TextFieldProps) {
  return (
    <label className="mb-4 grid gap-2 font-bold text-zinc-300">
      {label}
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  );
}
