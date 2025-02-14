import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tailwindcss(),
    // VitePWA({
    //   injectRegister: "auto",
    //   registerType: "autoUpdate",
    //   manifest: {
    //     name: "My Awesome PWA",
    //     short_name: "MyPWA",
    //     description: "An installable PWA built with Vite",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     icons: [
    //       {
    //         src: "/icon.png",
    //         sizes: "1077x1077",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     cleanupOutdatedCaches: true,
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
