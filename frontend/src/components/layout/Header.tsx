import { DarkThemeToggle } from "flowbite-react";
import React from "react";

const Header = () => {
  return (
    <div className="mx-auto flex items-center justify-between p-4">
      <DarkThemeToggle />
    </div>
  );
};

export default Header;
