"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ContactLink, ContactIcon, LinkFormData } from "@/types/database";

interface LinkFormProps {
  link?: ContactLink;
}

const iconOptions: { value: ContactIcon; label: string }[] = [
  { value: "zalo", label: "Zalo" },
  { value: "phone", label: "Điện thoại" },
  { value: "facebook", label: "Facebook" },
  { value: "messenger", label: "Messenger" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "website", label: "Website" },
  { value: "link", label: "Link khác" },
];

const defaultValues: LinkFormData = {
  title: "",
  url: "",
  icon: "zalo",
  sort_order: 0,
  is_active: true,
};

export function LinkForm({ link }: LinkFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<LinkFormData>(
    link
      ? {
          title: link.title,
          url: link.url,
          icon: link.icon,
          sort_order: link.sort_order,
          is_active: link.is_active,
        }
      : defaultValues
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof LinkFormData>(
    key: K,
    value: LinkFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const payload = { ...form, sort_order: Number(form.sort_order) };

    const { error: dbError } = link
      ? await supabase.from("contact_links").update(payload).eq("id", link.id)
      : await supabase.from("contact_links").insert(payload);

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push("/admin/links");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Field label="Tiêu đề *">
        <input
          required
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="input"
          placeholder="Zalo"
        />
      </Field>

      <Field label="URL *">
        <input
          required
          value={form.url}
          onChange={(e) => updateField("url", e.target.value)}
          className="input"
          placeholder="https://zalo.me/0123456789"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Icon">
          <select
            value={form.icon}
            onChange={(e) => updateField("icon", e.target.value as ContactIcon)}
            className="input"
          >
            {iconOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Thứ tự hiển thị">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => updateField("sort_order", Number(e.target.value))}
            className="input"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => updateField("is_active", e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300"
        />
        Hiển thị trên cửa hàng
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : link ? "Cập nhật" : "Thêm link"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-zinc-200 px-5 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      {children}
    </label>
  );
}
