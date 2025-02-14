import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Package,
  Stethoscope,
  TestTube,
  UserPlus2,
  Users,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigationItems = [
    {
      label: "Reception",
      url: "/",
      icon: UserPlus2,
    },
    {
      label: "Visits",
      url: "/visits",
      icon: Stethoscope,
    },
    {
      label: "Patients",
      url: "/patients",
      icon: Users,
    },
    {
      label: "Labs",
      url: "/labs",
      icon: TestTube,
    },
    {
      label: "Stock",
      url: "/stock",
      icon: Package,
    },
  ];

  return (
    <>
      <nav className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300",
        "bg-slate-900",
        scrolled ? "shadow-lg shadow-slate-900/50" : "shadow-md shadow-slate-900/30",
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0 group">
              <span className={cn(
                "text-2xl font-bold text-white",
                "transition-all duration-300",
                "group-hover:opacity-90 flex items-center gap-2"
              )}>
                <img src="/favicon.ico" alt="Logo" className="h-9 w-auto" />NMC
              </span>
            </Link>

            <button
              className={cn(
                "md:hidden p-2 rounded-lg",
                "text-white",
                "hover:bg-slate-700 active:bg-slate-600",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-slate-400"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.url}
                  variant="ghost"
                  asChild
                  className={cn(
                    "relative overflow-hidden group",
                    "text-slate-100 hover:text-white",
                    "transition-all duration-300",
                    "[&.active]:text-white",
                    "hover:bg-slate-700 active:bg-slate-600",
                    "[&.active]:bg-slate-700",
                    "focus:ring-2 focus:ring-slate-400",
                    "after:absolute after:bottom-0 after:left-0",
                    "after:h-0.5 after:w-full",
                    "after:translate-x-[-100%]",
                    "after:bg-sky-400",
                    "hover:after:translate-x-0",
                    "after:transition-transform after:duration-300",
                    "[&.active]:after:translate-x-0"
                  )}
                >
                  <Link
                    activeOptions={{ exact: true }}
                    to={item.url}
                    className="flex items-center px-4 py-2"
                  >
                    <item.icon className={cn(
                      "w-4 h-4 mr-2",
                      "transform group-hover:scale-110",
                      "transition-transform duration-200"
                    )} />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {isOpen && (
            <div className={cn(
              "fixed inset-x-0 top-16 bottom-0 md:hidden",
              "bg-slate-900",
              "animate-in slide-in-from-top-4",
              "border-t border-slate-800",
              "overflow-y-auto"
            )}>
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.url}
                    variant="ghost"
                    asChild
                    className={cn(
                      "w-full justify-start",
                      "text-slate-100 hover:text-white",
                      "transition-colors duration-200",
                      "[&.active]:text-white",
                      "hover:bg-slate-700 active:bg-slate-600",
                      "[&.active]:bg-slate-700",
                      "focus:ring-2 focus:ring-slate-400",
                      "rounded-lg"
                    )}
                  >
                    <Link
                      to={item.url}
                      className="flex items-center px-4 py-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer div to prevent content from going under the fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;