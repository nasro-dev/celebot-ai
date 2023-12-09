import { Menu } from "lucide-react";

import { Sheet,SheetContent,SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";
export const Mobilesidebar = () => {
    return ( 
       <Sheet>
        <SheetTrigger className="md:hidden pr-4">
            <Menu/>
        </SheetTrigger>
        <SheetContent className="p-0 bg-secondary pt-10 w-32" side="left">
             <Sidebar/>
        </SheetContent>
       </Sheet>
     );
}
 
