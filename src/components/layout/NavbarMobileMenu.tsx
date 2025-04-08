
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Menu } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
  user: User | null;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}

const NavbarMobileMenu = ({
  menuOpen,
  setMenuOpen,
  navItems,
  user,
  onSignOut,
  onNavigate,
}: NavbarMobileMenuProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {menuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-appNavy p-4 animate-in fade-in slide-in-from-top">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center py-2 text-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center py-2 text-lg font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  Profile
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    setMenuOpen(false);
                    onSignOut();
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                className="w-full mt-4"
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate("/login");
                }}
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default NavbarMobileMenu;
