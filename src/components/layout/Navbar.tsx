
import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "../../App";
import NavLogo from "./NavLogo";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import { useNavItems } from "./NavItems";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const navItems = useNavItems(user);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-appNavy border-border/40 backdrop-blur">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <NavLogo />

        {isMobile ? (
          <NavbarMobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            navItems={navItems}
            user={user}
            onSignOut={handleSignOut}
            onNavigate={handleNavigate}
          />
        ) : (
          <NavbarDesktopMenu
            navItems={navItems}
            user={user}
            onSignOut={handleSignOut}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
