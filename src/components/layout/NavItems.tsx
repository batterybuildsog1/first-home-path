
import React from "react";
import { Home, Calculator, PiggyBank, DollarSign } from "lucide-react";

export const useNavItems = (user: any | null) => {
  return [
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
};

export default useNavItems;
