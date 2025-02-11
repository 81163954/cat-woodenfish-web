"use client";

import * as React from "react";
import { Minus, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Switch } from "./ui/switch";
import useStatus from "@/hook/useStatus";

export default function SettingDrawer() {
  const { setAutoHit, autoHit } = useStatus((state) => state);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Settings
          className="w-9 h-9 absolute z-10 right-4 top-4"
          color="white"
        />
      </DrawerTrigger>
      <DrawerContent className="font-fusion">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>设置</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-0 flex items-center justify-center">
            自动敲击：
            <Switch
              className=" self-center"
              checked={autoHit}
              onCheckedChange={(e) => setAutoHit(e)}
            />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
