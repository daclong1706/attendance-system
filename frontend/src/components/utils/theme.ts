import { createTheme } from "flowbite-react";

export const theme = createTheme({
  datepicker: {
    popup: {
      footer: {
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-indigo-300",
          today:
            "bg-indigo-700 text-white hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700",
        },
      },
    },
  },
});
