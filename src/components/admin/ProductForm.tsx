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
  Typography,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
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
  const [imageError, setImageError] = useState(false);

  function updateField<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    if (key === "image_url") setImageError(false);
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

  const showPreview = Boolean(form.image_url.trim()) && !imageError;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
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
        </Grid>

        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 24 },
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "#fff",
              overflow: "hidden",
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Xem trước ảnh
              </Typography>
            </Box>
            <Box
              sx={{
                aspectRatio: "1",
                bgcolor: "#f5f3f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              {showPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image_url.trim()}
                  alt={form.name || "Xem trước sản phẩm"}
                  onError={() => setImageError(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Stack spacing={1} sx={{ alignItems: "center", px: 2 }}>
                  <ImageOutlinedIcon sx={{ fontSize: 48, color: "text.disabled" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "center" }}
                  >
                    {form.image_url.trim()
                      ? "Không tải được ảnh từ URL này"
                      : "Nhập URL ảnh để xem trước"}
                  </Typography>
                </Stack>
              )}
            </Box>
            {form.name && (
              <Box sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: "divider" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, wordBreak: "break-word" }}
                >
                  {form.name}
                </Typography>
                {form.brand && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {form.brand}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
