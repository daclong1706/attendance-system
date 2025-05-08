import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    // https: true,
    host: "0.0.0.0", // Cho phép truy cập từ thiết bị khác
    port: 3000,
    strictPort: true,

    allowedHosts: ["d58a-113-161-72-138.ngrok-free.app"], //frontend
  },
});
