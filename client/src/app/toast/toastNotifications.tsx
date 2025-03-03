import { toast, ToastOptions } from "react-toastify";
import "./toastStyles.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  // default time of 5s, however if different time is desired specify autoClose: time in the options inside toastNotify call and that will take precedence
  autoClose: 5000,
};

const toastNotify = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultOptions,
      style: {
        backgroundColor: "#64CC9F",
        color: "black",
      },
      ...options,
    }),
  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      ...defaultOptions,
      style: {
        backgroundColor: "#E2DC6A",
        color: "black",
      },
      progressClassName: "toast-progress-warning",
      ...options,
    }),
  error: (message: string, options?: ToastOptions) =>
    toast.error("❌ ‎ ‎" + message, {
      ...defaultOptions,
      style: {
        backgroundColor: "#C96F6F",
        color: "black",
      },
      progressClassName: "toast-progress-error",
      // default icon for error is hard to read with red background, using emoji instead
      icon: false,
      ...options,
    }),
  info: (message: string, options?: ToastOptions) =>
    toast.info(message, {
      ...defaultOptions,
      style: {
        backgroundColor: "#3A6AAC",
        color: "black",
      },
      ...options,
    }),
  custom: (message: string, options?: ToastOptions) =>
    toast(message, { ...options }),
};

export default toastNotify;
