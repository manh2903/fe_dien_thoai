import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import { ContactLinks } from "@/components/ContactLinks";
import type { Product } from "@/types/database";

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: products }, { data: links }] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_links")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Cửa hàng điện thoại
          </h1>
          <p className="mt-4 max-w-xl text-lg text-blue-100">
            Máy mới, máy cũ chất lượng — giá tốt, bảo hành uy tín. Liên hệ ngay
            để được tư vấn!
          </p>
          {links && links.length > 0 && (
            <div className="mt-8">
              <ContactLinks links={links} />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-zinc-900">
          Sản phẩm nổi bật
        </h2>

        {!products || products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center">
            <p className="text-zinc-500">Chưa có sản phẩm nào.</p>
            <p className="mt-1 text-sm text-zinc-400">
              Admin có thể thêm sản phẩm tại trang quản trị.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(products as Product[]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {links && links.length > 0 && <ContactLinks links={links} variant="floating" />}
    </>
  );
}
