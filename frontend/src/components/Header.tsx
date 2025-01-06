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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, Menu } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



export default function Header() {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const updateGuestCount = (type: keyof typeof guests, increment: boolean) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
    }));
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Çerezden token kontrolü
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Çerezi temizleyerek çıkış işlemini gerçekleştir
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`fixed top-0 left-0 w-full z-50  border-b bg-white`}>
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

        <div
          className={` flex items-center text-center rounded-3xl shadow-md border p-5 my-5 space-x-4 max-sm:hidden max-lg:hidden bg-white max-w-4xl transition-all duration-300  ${
            isScrolled ? "text-white py-0" : "text-black py-4"
          }`}
        >
          <div className={cn("grid gap-2")}>
            <label
              className={`block text-sm font-medium max-lg:hidden text-gray-500 ${
                isScrolled ? "hidden" : ""
              }`}
            >
              Yer
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between text-gray-500"
                >
                  {value
                    ? locations.find((location) => location.value === value)
                        ?.label
                    : "Yer Seçiniz..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Yer Ara..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Yer Bulunamadı.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.key}
                          value={location.value}
                          onSelect={(currentValue: string) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {location.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === location.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div
            className={`h-10 w-[1px] max-lg:hidden  bg-gray-200 ${
              isScrolled ? "hidden" : ""
            }`}
          />

          <div className={cn("grid gap-2")}>
            <label
              className={`block text-sm font-medium max-lg:hidden text-gray-500  ${
                isScrolled ? "hidden" : ""
              }`}
            >
              Giriş-Çıkış Tarihi Seçin
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Tarih Seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) =>
                    setDate({ from: range?.from, to: range?.to })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div
            className={`h-10 w-[1px] max-lg:hidden bg-gray-200 ${
              isScrolled ? "hidden" : ""
            }`}
          />

          <div className={cn("grid gap-2")}>
            <label
              className={`block text-sm font-medium max-lg:hidden text-gray-500 ${
                isScrolled ? "hidden" : ""
              }`}
            >
              Kişiler
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-48 px-4 py-2 text-gray-500"
                >
                  {`Kişiler: ${
                    guests.adults + guests.children + guests.infants
                  } misafir`}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4 shadow-lg rounded-xl bg-white">
                <div className="space-y-4">
                  {[
                    {
                      label: "Yetişkinler",
                      subLabel: "13 yaş ve üstü",
                      type: "adults",
                    },
                    {
                      label: "Çocuklar",
                      subLabel: "2-12 yaş",
                      type: "children",
                    },
                    {
                      label: "Bebekler",
                      subLabel: "2 yaş altı",
                      type: "infants",
                    },
                  ].map(({ label, subLabel, type }) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-gray-500">{subLabel}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                          onClick={() =>
                            updateGuestCount(type as keyof typeof guests, false)
                          }
                        >
                          -
                        </Button>
                        <span>{guests[type as keyof typeof guests]}</span>
                        <Button
                          variant="outline"
                          className="w-8 h-8 rounded-full"
                          onClick={() =>
                            updateGuestCount(type as keyof typeof guests, true)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="text-sm text-gray-500"
                    onClick={() =>
                      setGuests({ adults: 1, children: 0, infants: 0, pets: 0 })
                    }
                  >
                    Temizle
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Arama Butonu */}
          <Button
            className={`ml-4 h-12 w-12 rounded-full bg-pink-500 hover:bg-pink-600 ${
              isScrolled ? "h-8 w-8 m-4" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Button>
        </div>
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
                    <a href="/account">Hesap</a>
                  </DropdownMenuItem>
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

const locations = [
  {
    key: "1",
    value: "turkiye",
    label: "Türkiye",
  },
  {
    key: "2",
    value: "almanya",
    label: "Almanya",
  },
];
