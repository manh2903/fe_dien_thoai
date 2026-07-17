"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DeleteButtonProps {
  table: "products" | "contact_links";
  id: string;
  label?: string;
}

export function DeleteButton({ table, id, label = "Xóa" }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xóa?")) return;

    setLoading(true);
    const supabase = createClient();
    await supabase.from(table).delete().eq("id", id);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {loading ? "..." : label}
    </button>
  );
}
