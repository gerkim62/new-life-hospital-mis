import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, Package, Stethoscope, TestTube, UserPlus2, Users, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="w-full bg-primary sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-primary-foreground font-bold text-xl">HMS</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:bg-primary-foreground/10 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Navigation Items (Desktop) */}
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.url}
                variant="ghost"
                asChild
                className={cn(
                  "text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10",
                  "[&.active]:bg-primary-foreground/20 [&.active]:text-primary-foreground"
                )}
              >
                <Link to={item.url} className="flex items-center">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top-4 border-t border-primary-foreground/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.url}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start text-primary-foreground hover:bg-primary-foreground/10",
                    "[&.active]:bg-primary-foreground/20 [&.active]:text-primary-foreground"
                  )}
                >
                  <Link 
                    to={item.url} 
                    className="flex items-center px-3 py-2"
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
  );
};

export default Navbar;