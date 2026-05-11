import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover }: CardProps) {
  return (
    <div className={clsx("bg-gray-900 border border-gray-800 rounded-2xl p-6", hover && "hover:border-brand-500/30 transition-all", className)}>
      {children}
    </div>
  );
}
