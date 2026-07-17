import Link from "next/link";
import { Smartphone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Smartphone className="h-5 w-5" />
          </span>
          <span className="text-lg">PhoneShop</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-zinc-600 transition hover:text-blue-600">
            Sản phẩm
          </Link>
          <Link
            href="/admin/login"
            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-200"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
