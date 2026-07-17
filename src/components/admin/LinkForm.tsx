"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 560 }}>
      <Stack spacing={2.5}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Tiêu đề"
          required
          fullWidth
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <TextField
          label="URL"
          required
          fullWidth
          value={form.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://zalo.me/0123456789"
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Icon</InputLabel>
              <Select
                label="Icon"
                value={form.icon}
                onChange={(e) =>
                  updateField("icon", e.target.value as ContactIcon)
                }
              >
                {iconOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Thứ tự hiển thị"
              type="number"
              fullWidth
              value={form.sort_order}
              onChange={(e) =>
                updateField("sort_order", Number(e.target.value))
              }
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={
            <Checkbox
              checked={form.is_active}
              onChange={(e) => updateField("is_active", e.target.checked)}
            />
          }
          label="Hiển thị trên cửa hàng"
        />

        <Stack direction="row" spacing={1.5}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : link ? "Cập nhật" : "Thêm link"}
          </Button>
          <Button variant="outlined" onClick={() => router.back()}>
            Hủy
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
