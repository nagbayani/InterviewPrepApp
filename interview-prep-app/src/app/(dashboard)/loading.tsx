import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Loading = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loading...</DialogTitle>
        </DialogHeader>
        <span className='visually-hidden'>Loading...</span>
        <div
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
          role='status'
        ></div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
