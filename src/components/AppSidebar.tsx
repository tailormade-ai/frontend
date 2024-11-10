import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { chatTable } from "@/db/schema";
import { db } from "@/db";
import ChatLabels from "./ChatLabels";

const AppSidebar = async () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <div className="text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
            Your Chats
          </div>
          {/* TODO: Optimize with some pre fetching */}
          <ChatLabels />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
