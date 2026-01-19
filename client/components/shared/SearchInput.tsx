"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("search") || "");
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const currentSearch = currentParams.get("search") || "";
    
    // فقط قم بالتحديث إذا كانت القيمة مختلفة فعلياً
    if (currentSearch === query) return;

    if (query) {
      currentParams.set("search", query);
    } else {
      currentParams.delete("search");
    }
    
    const newPath = `${pathname}?${currentParams.toString()}`;
    router.replace(newPath, { scroll: false });
  }, [query, pathname, router, searchParams]);

  // Sync with URL when navigating back/forward (e.g. back button)
  const searchFromUrl = searchParams.get("search") || "";
  useEffect(() => {
    setText(searchFromUrl);
  }, [searchFromUrl]);

  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search"
        className="w-full rounded-2xl border shadow-none bg-white border-divider pl-11 h-14 focus-visible:ring-primary/20"
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...props}
      />
    </div>
  );
}
