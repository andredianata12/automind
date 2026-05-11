import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({ variant = "primary", size = "md", loading, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2",
        {
          "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25": variant === "primary",
          "bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700": variant === "secondary",
          "bg-transparent hover:bg-gray-800 text-gray-300": variant === "ghost",
          "py-1.5 px-3 text-xs": size === "sm",
          "py-3 px-6 text-sm": size === "md",
          "py-4 px-8 text-base": size === "lg",
          "opacity-50 cursor-not-allowed": loading || props.disabled,
        },
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </button>
  );
}
