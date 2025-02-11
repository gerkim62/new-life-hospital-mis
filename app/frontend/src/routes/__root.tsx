import Attribution from "@/components/layout/attribution";
import Navbar from "@/components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <div
      className="min-h-screen bg-repeat bg-top bg-auto flex flex-col"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,.2)] h-full"></div>

      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center relative z-50">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Attribution />
    </div>
  ),
});
