import { ContactLinks } from "@/components/ContactLinks";
import { createClient } from "@/lib/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("contact_links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-semibold text-zinc-900">PhoneShop</h3>
            <p className="mt-2 max-w-sm text-sm text-zinc-600">
              Cửa hàng điện thoại uy tín — máy mới, máy cũ chất lượng, giá tốt.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-900">Liên hệ</h4>
            <ContactLinks links={links ?? []} />
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} PhoneShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
