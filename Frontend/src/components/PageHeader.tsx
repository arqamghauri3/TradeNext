import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex mb-3">
      <SidebarTrigger className="cursor-pointer" />
      <p className="font-bold border border-r-0 border-t-0 border-b-0 border-l-white pl-2 h-6">{title}</p>
    </div>
  );
}