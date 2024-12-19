import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Menu } from "lucide-react";

export default function Header() {
  return (
    <div className="container mx-auto flex justify-between">
      <Image src="/logo1.png" alt="Logo" width={100} height={100} />
      <div className=" flex items-center text-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex border-2 p-2 rounded-full">
            <Menu className="mr-3" />
            <User />  
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="font-bold">Oturum Açın</DropdownMenuItem>
            <DropdownMenuItem>Kaydolun</DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
