import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "./menu"

// import LogoHDS from "@/app/(dashboard)/Logo";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="z-[9999] flex h-full flex-col px-3 sm:w-72"
        side="left"
      >
        <SheetHeader>
          {/* <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          > */}
          <div className="pl-4">
            {/* <LogoHDS size="large" style="rectangle"/> */}
          </div>
          {/* </Button> */}
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
