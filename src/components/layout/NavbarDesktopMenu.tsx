
import React from "react";
import { Link } from "react-router-dom";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

interface NavbarDesktopMenuProps {
  navItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
  user: User | null;
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}

const NavbarDesktopMenu = ({
  navItems,
  user,
  onSignOut,
  onNavigate,
}: NavbarDesktopMenuProps) => {
  return (
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
              <DropdownMenuItem onClick={() => onNavigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => onNavigate("/login")}>
            Sign In
          </Button>
        )}
      </div>
    </>
  );
};

export default NavbarDesktopMenu;
