"use client"

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounces";
import queryString from "query-string";



export const SearchInput = () => {
     const router = useRouter();
     const searchParams = useSearchParams();

     const category_id = searchParams.get("categoryID");
     const name = searchParams.get("name");

     const [value,setValue] = useState(name || " "); 
     const debounceValue = useDebounce<string>(value, 500);

     const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
     }
     useEffect(()=>{
        const query = {
            name: debounceValue,
            categoryID: category_id
        };
        const url = queryString.stringifyUrl({
                    url : window.location.href,
                    query,
        },{skipEmptyString:true,skipNull:true});
        router.push(url);
     },[debounceValue,router,category_id])
     
    return (
        <div className="relative">
            <SearchIcon className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"/> 
            <Input 
              onChange={onChange}
              value={value}
              placeholder="Search"
              className="pl-10 bg-primary/10"
              />
        </div>
      );
}
 
