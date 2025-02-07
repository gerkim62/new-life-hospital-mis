import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

import { Package, Stethoscope, TestTube, UserPlus2, Users } from "lucide-react";

const Navbar = () => {
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
    <nav className="w-full bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-primary-foreground font-bold text-xl">
              HMS
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-1">
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
      </div>
    </nav>
  );
};

export default Navbar;
