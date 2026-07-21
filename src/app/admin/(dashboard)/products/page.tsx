import Link from "next/link";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ProductActiveToggle } from "@/components/admin/ProductActiveToggle";
import { Pagination } from "@/components/Pagination";
import type { Product } from "@/types/database";

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const supabase = await createClient();
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: products, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
          >
            Quản lý sản phẩm
          </Typography>
          {count != null && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {count} sản phẩm
            </Typography>
          )}
        </Box>
        <Link href="/admin/products/new" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Thêm sản phẩm
          </Button>
        </Link>
      </Stack>
      {!products || products.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            border: "1px dashed",
            borderColor: "divider",
            py: 8,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            Chưa có sản phẩm. Hãy thêm sản phẩm đầu tiên.
          </Typography>
        </Paper>
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{ border: 1, borderColor: "divider", borderRadius: 3, overflow: "hidden" }}
          >
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="small" sx={{ minWidth: 720 }}>
                <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                  <TableRow>
                    <TableCell sx={{ width: 72 }}>Ảnh</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      Hãng
                    </TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Hiển thị</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(products as Product[]).map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1.5,
                            overflow: "hidden",
                            bgcolor: "#f5f3f4",
                            border: 1,
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {product.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image_url}
                              alt={product.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <ImageOutlinedIcon
                              sx={{ fontSize: 22, color: "text.disabled" }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: { xs: 140, sm: 220 } }}>
                        <Typography sx={{ fontWeight: 600, wordBreak: "break-word" }}>
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                        {product.brand}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell>
                        <ProductActiveToggle
                          id={product.id}
                          isActive={product.is_active}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center" }}
                        >
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              size="small"
                              color="secondary"
                              sx={{ minWidth: "auto", p: 0 }}
                            >
                              Sửa
                            </Button>
                          </Link>
                          <DeleteButton table="products" id={product.id} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {totalPages > 1 && (
            <Box sx={{ mt: 3 }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/admin/products"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
