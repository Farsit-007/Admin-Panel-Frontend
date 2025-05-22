"use client";
import { LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthServices";

export function NavUser() {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    setUser(null);
    await logout();
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="cursor-pointer bg-gray-200 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
