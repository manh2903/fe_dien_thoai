import { Box, Typography } from "@mui/material";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3
        }}>
        Thêm sản phẩm mới
      </Typography>
      <ProductForm />
    </Box>
  );
}
