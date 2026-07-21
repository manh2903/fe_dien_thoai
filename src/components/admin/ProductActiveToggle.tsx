"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Switch, Tooltip } from "@mui/material";
import { createClient } from "@/lib/supabase/client";

interface ProductActiveToggleProps {
  id: string;
  isActive: boolean;
}

export function ProductActiveToggle({ id, isActive }: ProductActiveToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  async function handleToggle(checked: boolean) {
    const previous = active;
    setActive(checked);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .update({ is_active: checked })
      .eq("id", id);

    setLoading(false);

    if (error) {
      setActive(previous);
      return;
    }

    router.refresh();
  }

  return (
    <Tooltip title={active ? "Đang hiển thị — bấm để ẩn" : "Đang ẩn — bấm để hiện"}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {loading && <CircularProgress size={14} />}
        <Switch
          size="small"
          checked={active}
          disabled={loading}
          onChange={(e) => handleToggle(e.target.checked)}
          color="success"
          slotProps={{
            input: {
              "aria-label": active ? "Ẩn sản phẩm" : "Hiện sản phẩm",
            },
          }}
        />
      </span>
    </Tooltip>
  );
}
