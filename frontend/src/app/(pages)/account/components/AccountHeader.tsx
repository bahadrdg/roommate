/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, Menu } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



export default function Header() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className={`fixed w-full z-50  border-b bg-[#fafafa]`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-between space-x-4 items-center">
        <a className="flex items-center" href="/">
          <Image
            className="min-w-16 min-h-16 "
            src="/logo1.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </a>

        
        <div className="flex items-center text-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex border-gray-500 border-2 p-2 rounded-full text-gray-500 hover:drop-shadow-xl">
              <Menu className="mr-3" />
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem className="font-bold">
                    <a href="/">Mesajlar</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-bold">
                    <a href="/">Favoriler</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="/">Profilim</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={handleLogout} className="text-bg-pink-500">
                      Çıkış Yap
                    </button>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="font-bold">
                    <a href="/login">Oturum Açın</a>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a href="/register">Kaydolun</a>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
