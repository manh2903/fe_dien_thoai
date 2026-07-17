import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/ProductCard";
import { ContactLinks } from "@/components/ContactLinks";
import { Pagination } from "@/components/Pagination";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesBanner } from "@/components/FeaturesBanner";
import { CtaSection } from "@/components/CtaSection";
import type { Product, ContactLink } from "@/types/database";

const PAGE_SIZE = 12;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const supabase = await createClient();
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const [{ data: products, count }, { data: links }] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range(from, to),
    supabase
      .from("contact_links")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const contactLinks = (links ?? []) as ContactLink[];
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);
  const hotline =
    contactLinks.find((l) => l.icon === "phone") ?? contactLinks[0] ?? null;

  return (
    <>
      <HeroSection hotline={hotline} />
      <FeaturesBanner />
      <Box component="section" id="products" sx={{ py: 6 }}>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            sx={{
              alignItems: "flex-end",
              justifyContent: "space-between",
              mb: 6
            }}>
            <Box>
              <Typography
                variant="overline"
                color="secondary"
                sx={{ display: "block", mb: 1 }}
              >
                Cửa hàng
              </Typography>
              <Typography variant="h3" sx={{
                fontWeight: 600
              }}>
                Sản phẩm nổi bật
              </Typography>
            </Box>
            {count != null && count > 0 && (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 600
                }}>
                {count} sản phẩm
              </Typography>
            )}
          </Stack>

          {!products || products.length === 0 ? (
            <Box
              sx={{
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 4,
                py: 10,
                textAlign: "center",
              }}
            >
              <Typography sx={{
                color: "text.secondary"
              }}>Chưa có sản phẩm nào.</Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.disabled",
                  mt: 1
                }}>
                Admin có thể thêm sản phẩm tại trang quản trị.
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {(products as Product[]).map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ mt: 6 }}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/"
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
      <CtaSection links={contactLinks} />
      {contactLinks.length > 0 && (
        <ContactLinks links={contactLinks} variant="floating" />
      )}
    </>
  );
}
