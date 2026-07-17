import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import type { ContactLink } from "@/types/database";

export default async function AdminLinksPage() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("contact_links")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý link liên hệ</h1>
        <Link
          href="/admin/links/new"
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Thêm link
        </Link>
      </div>

      {!links || links.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white py-12 text-center text-zinc-500">
          Chưa có link liên hệ. Thêm Zalo, Hotline, Facebook...
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-4 py-3 font-medium">Tiêu đề</th>
                <th className="px-4 py-3 font-medium">URL</th>
                <th className="px-4 py-3 font-medium">Icon</th>
                <th className="px-4 py-3 font-medium">Thứ tự</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {(links as ContactLink[]).map((link) => (
                <tr key={link.id} className="border-b border-zinc-100">
                  <td className="px-4 py-3 font-medium">{link.title}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-zinc-600">
                    {link.url}
                  </td>
                  <td className="px-4 py-3 capitalize">{link.icon}</td>
                  <td className="px-4 py-3">{link.sort_order}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        link.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {link.is_active ? "Hiển thị" : "Ẩn"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/links/${link.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Sửa
                      </Link>
                      <DeleteButton table="contact_links" id={link.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
