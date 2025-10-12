import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { trade } from "./data";
import AddTradeComponent from "@/components/AddTradeComponent";

const page = () => {
  return (
    <>
      <div className="flex justify-between">
        <PageHeader title="Trade Journal" />
        <Dialog>
          <DialogTrigger className="font-bold cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
              <PlusIcon />
              <span>Add Trade</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Trade</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>
            <AddTradeComponent />
          </DialogContent>
        </Dialog>
      </div>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={trade} />
    </div>
    </>
  );
};

export default page;
