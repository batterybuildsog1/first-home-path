
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Home, BarChart3, PiggyBank, Calculator, User } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-appNavy border-t border-muted z-50">
        <div className="flex justify-between items-center px-2 py-2">
          <MobileNavLink to="/" icon={<Home size={20} />} label="Home" />
          <MobileNavLink to="/finances" icon={<BarChart3 size={20} />} label="Finances" />
          <MobileNavLink to="/savings" icon={<PiggyBank size={20} />} label="Savings" />
          <MobileNavLink to="/calculator" icon={<Calculator size={20} />} label="Calculator" />
          <MobileNavLink to="/profile" icon={<User size={20} />} label="Profile" />
        </div>
      </nav>
    );
  }

  return (
    <header className="border-b border-muted bg-appNavy">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5 text-appBlue" />
            <span className="text-xl font-bold bg-gradient-to-r from-appBlue to-appPurple bg-clip-text text-transparent">
              FirstHomePath
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/finances">Finances</NavLink>
            <NavLink to="/savings">Savings</NavLink>
            <NavLink to="/calculator">Calculator</NavLink>
            <NavLink to="/resources">Resources</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            Get Help
          </Button>
          <NavLink to="/profile" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Profile</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary ${className}`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center py-1 px-3 text-muted-foreground hover:text-primary"
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navbar;
