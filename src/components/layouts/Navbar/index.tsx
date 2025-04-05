"use client";

import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import Auth from "./Auth";
import { MENU_ITEMS } from "@/common/constant/menu";
import clsx from "clsx";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={clsx(
        "w-full px-4 lg:px-10 xl:px-36 py-1 sticky top-0 z-10 transition-transform duration-300 bg-transparent backdrop-blur-md flex items-center shadow-md text-white",
        {
          "transform -translate-y-full": !isVisible,
          "transform translate-y-0": isVisible,
        }
      )}
    >
      <nav className="w-full flex justify-between items-center">
        <MenuItem items={MENU_ITEMS} />
        {/* <Auth /> */}
      </nav>
    </header>
  );
}
