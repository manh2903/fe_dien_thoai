import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            Không có ảnh
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            product.condition === "new"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {product.condition === "new" ? "Mới" : "Cũ"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
          {product.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-zinc-900 group-hover:text-blue-600">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
          {product.storage && <span>{product.storage}</span>}
          {product.ram && <span>• {product.ram}</span>}
          {product.color && <span>• {product.color}</span>}
        </div>
        <p className="mt-auto pt-3 text-lg font-bold text-red-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
