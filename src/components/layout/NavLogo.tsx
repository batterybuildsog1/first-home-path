
import React from "react";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="font-semibold text-xl flex items-center">
      <span className="bg-gradient-to-r from-appBlue to-appPurple bg-clip-text text-transparent">
        FirstHome
      </span>
      <span className="text-white">Path</span>
    </Link>
  );
};

export default NavLogo;
