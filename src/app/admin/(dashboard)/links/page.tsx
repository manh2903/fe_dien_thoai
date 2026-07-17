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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Pagination } from "@/components/Pagination";
import type { ContactLink } from "@/types/database";

const PAGE_SIZE = 50;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminLinksPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const supabase = await createClient();
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: links, count } = await supabase
    .from("contact_links")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
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
            Quản lý link liên hệ
          </Typography>
          {count != null && (
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {count} link
            </Typography>
          )}
        </Box>
        <Link href="/admin/links/new" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Thêm link
          </Button>
        </Link>
      </Stack>
      {!links || links.length === 0 ? (
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
            Chưa có link liên hệ. Thêm Zalo, Hotline, Facebook...
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
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      URL
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      Icon
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                      Thứ tự
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      Trạng thái
                    </TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(links as ContactLink[]).map((link) => (
                    <TableRow key={link.id} hover>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>{link.title}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          display: { xs: "none", md: "table-cell" },
                          maxWidth: 240,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {link.url}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: { xs: "none", sm: "table-cell" },
                          textTransform: "capitalize",
                        }}
                      >
                        {link.icon}
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                        {link.sort_order}
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                        <Chip
                          size="small"
                          label={link.is_active ? "Hiển thị" : "Ẩn"}
                          color={link.is_active ? "success" : "default"}
                        />
                      </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{
                        alignItems: "center"
                      }}>
                        <Link
                          href={`/admin/links/${link.id}/edit`}
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
                        <DeleteButton table="contact_links" id={link.id} />
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
                basePath="/admin/links"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
