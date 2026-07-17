"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product: p }: ProductDetailProps) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Quay lại
      </Button>
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 4,
          p: { xs: 3, md: 4 },
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "1",
                bgcolor: "#f5f3f4",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain", padding: 24 }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  Không có ảnh
                </Box>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" color="secondary">
              {p.brand}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                mb: 2
              }}>
              {p.name}
            </Typography>

            <Chip
              label={p.condition === "new" ? "Máy mới" : "Máy cũ"}
              sx={{
                bgcolor: p.condition === "new" ? "success.main" : "warning.main",
                color: "#fff",
                fontWeight: 700,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                color: "price.main",
                fontWeight: 700,
                fontSize: 36,
                letterSpacing: "-0.02em",
                mb: 3,
              }}
            >
              {formatPrice(p.price)}
            </Typography>

            <Paper
              elevation={0}
              sx={{ bgcolor: "#F8FAFC", p: 2.5, borderRadius: 3, mb: 3 }}
            >
              <Grid container spacing={2}>
                {p.storage && (
                  <>
                    <Grid size={6}>
                      <Typography variant="body2" sx={{
                        color: "text.secondary"
                      }}>
                        Bộ nhớ
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography sx={{
                        fontWeight: 600
                      }}>{p.storage}</Typography>
                    </Grid>
                  </>
                )}
                {p.ram && (
                  <>
                    <Grid size={6}>
                      <Typography variant="body2" sx={{
                        color: "text.secondary"
                      }}>
                        RAM
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography sx={{
                        fontWeight: 600
                      }}>{p.ram}</Typography>
                    </Grid>
                  </>
                )}
                {p.color && (
                  <>
                    <Grid size={6}>
                      <Typography variant="body2" sx={{
                        color: "text.secondary"
                      }}>
                        Màu sắc
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography sx={{
                        fontWeight: 600
                      }}>{p.color}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>

            {p.description && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    mb: 1
                  }}>
                  Mô tả
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    whiteSpace: "pre-line",
                    lineHeight: 1.7
                  }}>
                  {p.description}
                </Typography>
              </Box>
            )}

            <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
              Liên hệ qua Hotline / Zalo để đặt hàng và được tư vấn.
            </Alert>

            <Stack direction="row" spacing={2}>
              <Button
                component="a"
                href="tel:0123456789"
                variant="contained"
                color="secondary"
                startIcon={<CallIcon />}
                size="large"
              >
                Gọi tư vấn
              </Button>
              <Button component={Link} href="/#contact" variant="outlined" size="large">
                Xem liên hệ
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
