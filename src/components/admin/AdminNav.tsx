"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { LogOut, Link2, Package } from "lucide-react";

const navItems = [
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/links", label: "Link liên hệ", icon: Link2 },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-200 bg-white">
      <div className="flex h-16 items-center border-b border-zinc-200 px-4 font-semibold">
        Admin Panel
      </div>
      <nav className="p-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
              pathname.startsWith(href)
                ? "bg-blue-50 font-medium text-blue-700"
                : "text-zinc-600 hover:bg-zinc-50"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-zinc-200 p-3">
        <Link
          href="/"
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
        >
          ← Xem cửa hàng
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
