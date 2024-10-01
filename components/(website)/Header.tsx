"use client";
import React from "react";
import { FloatingNav } from "../ui/FloatingNavbar";
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { navLinks } from "@/lib/data/websitedata";
export function Header() {
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navLinks} />
    </div>
  );
}
