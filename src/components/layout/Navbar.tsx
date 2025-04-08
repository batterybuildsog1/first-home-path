
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Home, Calculator, PiggyBank, DollarSign, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "../../App";

const Navbar = () => {
  const { isMobile } = useMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    {
      icon: <Home className="h-4 w-4 mr-2" />,
      label: "Home",
      href: user ? "/dashboard" : "/",
    },
    {
      icon: <DollarSign className="h-4 w-4 mr-2" />,
      label: "Finances",
      href: "/finances",
    },
    {
      icon: <PiggyBank className="h-4 w-4 mr-2" />,
      label: "Savings",
      href: "/savings",
    },
    {
      icon: <Calculator className="h-4 w-4 mr-2" />,
      label: "Calculators",
      href: "/calculator",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-appNavy border-border/40 backdrop-blur">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to="/" className="font-semibold text-xl flex items-center">
          <span className="bg-gradient-to-r from-appBlue to-appPurple bg-clip-text text-transparent">
            FirstHome
          </span>
          <span className="text-white">Path</span>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
                          handleSignOut();
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
                        navigate("/login");
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <NavigationMenu className="mx-auto">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      )}
                      asChild
                    >
                      <Link to={item.href}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 rounded-full p-0" aria-label="User menu">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
