"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
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
    <Button
      color="error"
      size="small"
      onClick={handleDelete}
      disabled={loading}
      sx={{ minWidth: "auto", p: 0 }}
    >
      {loading ? "..." : label}
    </Button>
  );
}
