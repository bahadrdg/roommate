import RegisterForm from "@/components/form/RegisterForm";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen ">
      <div className="flex w-1/2 max-lg:hidden">
        <Image
          className="w-full h-dvh object-cover"
          src={"/register.jpg"}
          alt={"login arka plan"}
          sizes="100vw"
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/2 max-lg:w-full flex-1 flex-col">
        <div className="m-5">
          <div className="flex">
            <Image src={"/logo1.png"} alt="Logo" width={100} height={100} />
          </div>
        </div>
        <div className="">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
