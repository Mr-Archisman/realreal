"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineAlignRight } from "react-icons/ai";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

import { toggleValue, selectToggleValue } from "@/utils/toggleSlice";
import { MenuItems } from "@/common/types/menu";

interface MenuItemProps {
  items: MenuItems[];
}

export default function MenuItem({ items }: MenuItemProps) {
  const dispatch = useDispatch();
  const toggleState = useSelector(selectToggleValue);
  const handleToggle = () => {
    dispatch(toggleValue());
  };

  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col lg:flex-row gap-y-6 lg:gap-x-8 2xl:gap-x-16 lg:items-center">
      {/* Logo + Toggle */}
      <div className="flex justify-between items-center">
        <Link href="#home" aria-label="home" className="rounded-lg">
          <Image
            src="/4.png"
            alt="logo"
            width="16"
            height="16"
            sizes="100vw"
            className="w-[120px] h-20 object-contain rounded-lg"
          />
        </Link>
        <button
          type="button"
          onClick={handleToggle}
          aria-label="btn-navbar"
          className="block lg:hidden"
        >
          <AiOutlineAlignRight />
        </button>
      </div>

      {/* Mobile Menu */}
      {toggleState && (
        <>
          <div className="flex lg:hidden flex-col gap-y-6 tracking-wide ml-2">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm lg:text-lg capitalize font-medium text-neutral-600"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="lg:hidden flex flex-col gap-y-4">
            <Button
              type="text"
              aria-label="login"
              className="h-auto font-medium tracking-wide"
            >
              <p className="text-lg">Log in</p>
            </Button>
            <Button
              aria-label="create-account"
              className="h-auto py-2 px-8 rounded-2xl bg-black text-white"
            >
              <p className="text-lg">Create Account</p>
            </Button>
          </div>
        </>
      )}

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-x-12 tracking-wide">
        {items.map((item, index) => (
          <p key={index}>
            <Link
              href={pathname !== "/" ? `/${item.href}` : item.href}
              scroll={true}
              className="text-gray-700 hover:text-black transition-all capitalize font-medium"
            >
              {item.title}
            </Link>
          </p>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex gap-x-4 ml-auto">
        <Link
          href="https://www.instagram.com/tulips_prime_prop/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="text-xl text-gray-600 hover:text-black transition-all" />
        </Link>
        <Link
          href=" https://www.facebook.com/profile.php?id=61574944408106"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-xl text-gray-600 hover:text-black transition-all" />
        </Link>
        <Link
          href="https://x.com/RehaanSingh27"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter/X"
        >
          <FaXTwitter className="text-xl text-gray-600 hover:text-black transition-all" />
        </Link>
      </div>
    </div>
  );
}
