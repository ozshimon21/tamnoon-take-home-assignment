import { createContext } from "react";

interface ToastContextType {
  showToast: (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
