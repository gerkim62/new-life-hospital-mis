import Attribution from "@/components/layout/attribution";
import Navbar from "@/components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <div
      className="min-h-screen bg-repeat bg-top bg-auto flex flex-col "
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center relative bg-[rgba(0,0,0,.5)]">
        <div className="w-full ">
          <Outlet />

          <Attribution />
        </div>
      </div>
    </div>
  ),
});
