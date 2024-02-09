"use client";

import {
  LogOutIcon,
  UserIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader } from "./ui/sheet";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const SideMenu = () => {
  const { data } = useSession();
  const handleLoginClickGoogle = () => {
    signIn("google");
  };
  const handleLogoutClickGoogle = () => {
    signOut();
  };
  return (
    <>
      <SheetHeader className="text-left p-5 border-b border-solid border-secondary">
        Menu
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>

          <Button variant="secondary" size="icon">
            <LogOutIcon onClick={handleLogoutClickGoogle} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-5">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, Faça seu login!</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLoginClickGoogle}
          >
            <LogInIcon className="mr-3" size={20} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col px-5 gap-3">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-3" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-3" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
