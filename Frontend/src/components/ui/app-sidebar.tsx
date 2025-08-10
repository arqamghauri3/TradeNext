import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpenText,
  Calculator,
  ChartCandlestickIcon,
  HelpCircle,
  LayoutDashboardIcon,
  Settings,
} from "lucide-react";

export function AppSidebar() {
  const content = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Trade Journal",
      url: "/dashboard/trade-journal",
      icon: BookOpenText,
    },
    {
      title: "Risk Management",
      url: "/dashboard/risk-management",
      icon: Calculator,
    },
    {
      title: "Workspace",
      url: "/dashboard/workspace",
      icon: ChartCandlestickIcon,
    },
  ];

  const footer = [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help",
      url: "#",
      icon: HelpCircle,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {footer.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="border ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {content.map((item) => (
                <SidebarMenuItem key={item.title} className="py-2 px-3">
                  <SidebarMenuButton asChild className="hover:font-bold">
                    <a href={item.url} className="active:font-bold">
                      <item.icon />
                      <span className="ml-2 text-md">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {footer.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
