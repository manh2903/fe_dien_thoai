import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";
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
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3
        }}>
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: 700
          }}>
            Quản lý sản phẩm
          </Typography>
          {count != null && (
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {count} sản phẩm
            </Typography>
          )}
        </Box>
        <Link href="/admin/products/new" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
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
          <Typography sx={{
            color: "text.secondary"
          }}>
            Chưa có sản phẩm. Hãy thêm sản phẩm đầu tiên.
          </Typography>
        </Paper>
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{ border: 1, borderColor: "divider", borderRadius: 3, overflow: "hidden" }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                <TableRow>
                  <TableCell>Tên</TableCell>
                  <TableCell>Hãng</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(products as Product[]).map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Typography sx={{
                        fontWeight: 600
                      }}>{product.name}</Typography>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={product.is_active ? "Hiển thị" : "Ẩn"}
                        color={product.is_active ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{
                        alignItems: "center"
                      }}>
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
