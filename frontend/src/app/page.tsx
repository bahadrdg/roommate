"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type test = {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  favorites: boolean;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  return (
    <div>
      <Header />
      <div className="pt-40">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4">
          {test.map((item: test) => (
            <div key={item.id} className="relative">
              <Link href={`/`}>
                <div className=" shadow-lg rounded-lg">
                  <div className="relative w-full h-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-1 rounded-lg "
                    />
                  </div>
                  <div className="relative p-4">
                    <Avatar className="absolute -top-6 border-2 border-white">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between">
                      <div>
                        <h1 className="font-bold text-lg">{item.name}</h1>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500">{item.category}</p>

                        <p className="">{item.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.price} ₺</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Button className="absolute right-2 top-2 rounded-full bg-black/55 w-8 h-8 ">
                {item.favorites ? <FaHeart /> : <FaRegHeart />}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const test = [
  {
    id: 1,
    name: "test",
    description: "test",
    price: 10000.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: true,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 2,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 3,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 4,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 5,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 6,
    name: "test",
    description: "test",
    price: 10000.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 7,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 8,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 9,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
  {
    id: 10,
    name: "test",
    description: "test",
    price: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_pXY_A7Dzz4NPUbORhp15xTXR1yottV-RKQ&s",
    category: "test",
    location: "ankara",
    favorites: false,
    created_at: "2022-03-03T08:00:00Z",
    updated_at: "2022-03-03T08:00:00Z",
  },
];
