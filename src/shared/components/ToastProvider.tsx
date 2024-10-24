import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { ToastContext } from "../contexts/ToastContext";

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const showToast = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <Alert onClose={hideToast} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
