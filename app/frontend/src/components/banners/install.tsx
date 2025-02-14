"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const InstallBanner = () => {
  const [, setIsInstalling] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    // Prevent the default behavior to keep the event available for later use
    event.preventDefault();

    // how to make sure the event is of type BeforeInstallPromptEvent

    // Save the event for later use
    setDeferredEvent(event);

    setIsBannerVisible(true);
  };

  const install = async () => {
    if (!deferredEvent) return;
    setIsInstalling(true);
    try {
      await deferredEvent.prompt();
      const { outcome } = await deferredEvent.userChoice;
      if (outcome === "accepted") {
        setDeferredEvent(null);
      } else {
        toast.error(
          `You declined the installation. You can install the app later`
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error while installing. Please try again later.`);
    }
    setIsInstalling(false);
    setIsBannerVisible(false);
  };

  const deny = () => {
    setIsBannerVisible(false);
    toast.warning(
      `You declined the installation. You can install the app later`
    );
  };

  if (!isBannerVisible) return null;

  return (
    <>
  {/* Transparent overlay */}
  <div
    onClick={() => deny()}
    className="fixed inset-0 bg-black/50 z-40"
  />

  {/* Centered banner */}
  <div className="fixed left-0 right-0 bottom-10 flex items-center justify-center z-50 px-4">
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-600 text-white p-4 flex items-center justify-between shadow-lg rounded-lg w-full max-w-sm md:max-w-lg mx-auto">
      <div className="flex items-center">
        <img src="/favicon.ico" className="w-10 h-10 text-cyan-300 mr-4" />
        <div>
          <h3 className="font-bold text-lg mb-1">NMC App</h3>
          <div className="text-sm text-cyan-100">Hospital MIS</div>
        </div>
      </div>
      <Button
        className="bg-white text-purple-700 px-4 py-2 rounded-full font-medium hover:bg-cyan-100 transition-colors duration-300 shadow-md flex items-center"
        onClick={install}
      >
        <Download size={16} className="mr-2" />
        <span>Install</span>
      </Button>
    </div>
  </div>
</>

  );
};

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default InstallBanner;
