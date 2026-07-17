import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3
        }}>
        Sửa sản phẩm
      </Typography>
      <ProductForm product={product as Product} />
    </Box>
  );
}
