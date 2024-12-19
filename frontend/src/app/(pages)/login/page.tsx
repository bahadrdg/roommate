import Login from "@/components/form/LoginForm";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col max-lg:w-full">
        <div className="m-5">
          <div className="flex">
            <Image src={"/logo1.png"} alt="Logo" width={100} height={100} />
          </div>
        </div>
        <div className="">
          <Login/>
        </div>
      </div>
      <div className="flex w-1/2 max-lg:hidden">
        <Image
          className="w-full h-dvh object-cover"
          src={"/login.jpg"}
          alt={"login arka plan"}
          sizes="100vw"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
