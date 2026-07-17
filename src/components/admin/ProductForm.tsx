"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Product, ProductFormData } from "@/types/database";

interface ProductFormProps {
  product?: Product;
}

const defaultValues: ProductFormData = {
  name: "",
  brand: "",
  price: 0,
  description: "",
  image_url: "",
  storage: "",
  ram: "",
  color: "",
  condition: "new",
  is_active: true,
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(
    product
      ? {
          name: product.name,
          brand: product.brand,
          price: product.price,
          description: product.description,
          image_url: product.image_url,
          storage: product.storage,
          ram: product.ram,
          color: product.color,
          condition: product.condition,
          is_active: product.is_active,
        }
      : defaultValues
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const payload = { ...form, price: Number(form.price) };

    const { error: dbError } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload);

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên sản phẩm *">
          <input
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="input"
            placeholder="iPhone 15 Pro Max"
          />
        </Field>
        <Field label="Hãng *">
          <input
            required
            value={form.brand}
            onChange={(e) => updateField("brand", e.target.value)}
            className="input"
            placeholder="Apple"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Giá (VND) *">
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            className="input"
          />
        </Field>
        <Field label="Tình trạng">
          <select
            value={form.condition}
            onChange={(e) =>
              updateField("condition", e.target.value as "new" | "used")
            }
            className="input"
          >
            <option value="new">Mới</option>
            <option value="used">Cũ</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Bộ nhớ">
          <input
            value={form.storage}
            onChange={(e) => updateField("storage", e.target.value)}
            className="input"
            placeholder="256GB"
          />
        </Field>
        <Field label="RAM">
          <input
            value={form.ram}
            onChange={(e) => updateField("ram", e.target.value)}
            className="input"
            placeholder="8GB"
          />
        </Field>
        <Field label="Màu sắc">
          <input
            value={form.color}
            onChange={(e) => updateField("color", e.target.value)}
            className="input"
            placeholder="Đen"
          />
        </Field>
      </div>

      <Field label="URL ảnh">
        <input
          value={form.image_url}
          onChange={(e) => updateField("image_url", e.target.value)}
          className="input"
          placeholder="https://..."
        />
      </Field>

      <Field label="Mô tả">
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="input resize-none"
          placeholder="Mô tả chi tiết sản phẩm..."
        />
      </Field>

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
          {loading ? "Đang lưu..." : product ? "Cập nhật" : "Thêm sản phẩm"}
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
