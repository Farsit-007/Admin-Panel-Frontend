"use client";
import * as React from "react";
import {  SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Projects",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Create Project",
        url: "/add-project",
      },
      {
        title: "Manage Project",
        url: "/manage-project",
      },
    ],
  },
  {
    title: "Blogs",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Create Blog",
        url: "/add-blog",
      },
      {
        title: "Manage Blog",
        url: "/manage-blog",
      },
    ],
  },
   {
    title: "Experiance",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Add Experiance",
        url: "/add-experiance",
      },
      {
        title: "Manage Experiance",
        url: "/manage-experiance",
      },
    ],
  },
  {
    title: "Skills",
    url: "#",
    icon: SquareTerminal,
    items: [
      {
        title: "Add Skills",
        url: "/add-skill",
      },
      {
        title: "Manage Skills",
        url: "/manage-skill",
      },
    ],
  },
 
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
