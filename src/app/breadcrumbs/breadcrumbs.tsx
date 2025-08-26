"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link
        href="/"
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>

      {segments.map((segment) => {
        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium capitalize">
              {segment === "pool" ? "Pool Details" : segment}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
