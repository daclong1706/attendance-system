import { toast } from "sonner";

export const showErrorMessage = (message: string) => {
  toast.error(message, {
    duration: 2000,
    style: {
      backgroundColor: "#f05252",
      color: "white",
      border: "1px solid #d60000",
    },
  });
};

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    duration: 2000,
    style: {
      backgroundColor: "#0e9f6e",
      color: "white",
      border: "1px solid #1e7e34",
    },
  });
};
