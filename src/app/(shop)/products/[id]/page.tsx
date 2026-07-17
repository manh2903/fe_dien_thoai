import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!product) notFound();

  const p = product as Product;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <div className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 md:grid-cols-2 md:p-8">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
          {p.image_url ? (
            <Image
              src={p.image_url}
              alt={p.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              Không có ảnh
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            {p.brand}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-900 md:text-3xl">
            {p.name}
          </h1>

          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              p.condition === "new"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {p.condition === "new" ? "Máy mới" : "Máy cũ"}
          </span>

          <p className="mt-4 text-3xl font-bold text-red-600">
            {formatPrice(p.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 text-sm">
            {p.storage && (
              <>
                <dt className="text-zinc-500">Bộ nhớ</dt>
                <dd className="font-medium">{p.storage}</dd>
              </>
            )}
            {p.ram && (
              <>
                <dt className="text-zinc-500">RAM</dt>
                <dd className="font-medium">{p.ram}</dd>
              </>
            )}
            {p.color && (
              <>
                <dt className="text-zinc-500">Màu sắc</dt>
                <dd className="font-medium">{p.color}</dd>
              </>
            )}
          </dl>

          {p.description && (
            <div className="mt-6">
              <h2 className="mb-2 font-semibold text-zinc-900">Mô tả</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-600">
                {p.description}
              </p>
            </div>
          )}

          <p className="mt-8 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
            Liên hệ qua các kênh bên dưới trang để đặt hàng và được tư vấn.
          </p>
        </div>
      </div>
    </div>
  );
}
