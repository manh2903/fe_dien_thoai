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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 720 }}>
      <Stack spacing={2.5}>
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Tên sản phẩm"
              required
              fullWidth
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Hãng"
              required
              fullWidth
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Giá (VND)"
              type="number"
              required
              fullWidth
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Tình trạng</InputLabel>
              <Select
                label="Tình trạng"
                value={form.condition}
                onChange={(e) =>
                  updateField("condition", e.target.value as "new" | "used")
                }
              >
                <MenuItem value="new">Mới</MenuItem>
                <MenuItem value="used">Cũ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Bộ nhớ"
              fullWidth
              value={form.storage}
              onChange={(e) => updateField("storage", e.target.value)}
              placeholder="256GB"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="RAM"
              fullWidth
              value={form.ram}
              onChange={(e) => updateField("ram", e.target.value)}
              placeholder="8GB"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Màu sắc"
              fullWidth
              value={form.color}
              onChange={(e) => updateField("color", e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="URL ảnh"
              fullWidth
              value={form.image_url}
              onChange={(e) => updateField("image_url", e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
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
            {loading ? "Đang lưu..." : product ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
          <Button variant="outlined" onClick={() => router.back()}>
            Hủy
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
