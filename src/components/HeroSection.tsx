"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { ContactLink } from "@/types/database";

const HERO_IMAGE = "/hero.png";

interface HeroSectionProps {
  hotline?: ContactLink | null;
}

export function HeroSection({ hotline }: HeroSectionProps) {
  const phoneHref = hotline?.url?.startsWith("tel:")
    ? hotline.url
    : hotline?.url ?? "tel:0123456789";
  const phoneLabel =
    hotline?.title === "Hotline" || hotline?.icon === "phone"
      ? hotline.url.replace(/^tel:/, "")
      : "0123456789";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        bgcolor: "primary.main",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -96,
            right: -96,
            width: 384,
            height: 384,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            filter: "blur(64px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -96,
            left: -96,
            width: 384,
            height: 384,
            borderRadius: "50%",
            bgcolor: "#1e293b",
            filter: "blur(64px)",
          }}
        />
      </Box>
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          sx={{
            alignItems: "center"
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.15,
              }}
            >
              Cửa hàng điện thoại uy tín
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)",
                maxWidth: 480,
                mb: 4,
              }}
            >
              Máy mới, máy cũ chất lượng — giá tốt, bảo hành uy tín. Liên hệ ngay
              để được tư vấn!
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                mb: 5
              }}>
              <Button
                component={Link}
                href="#products"
                variant="contained"
                sx={{
                  bgcolor: "#fff",
                  color: "primary.main",
                  px: 4,
                  py: 1.75,
                  borderRadius: 3,
                  boxShadow: 3,
                  "&:hover": { bgcolor: "#F8FAFC" },
                }}
              >
                Xem sản phẩm ngay
              </Button>
              <Button
                component="a"
                href={phoneHref}
                variant="outlined"
                startIcon={<CallIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  px: 4,
                  py: 1.75,
                  borderRadius: 3,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "#fff" },
                }}
              >
                Hotline: {phoneLabel}
              </Button>
            </Stack>

            <Stack direction="row" spacing={4} sx={{
              alignItems: "center"
            }}>
              <Box>
                <Typography sx={{ fontSize: 32, fontWeight: 700 }}>10K+</Typography>
                <Typography
                  variant="overline"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Khách hàng
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "1px",
                  height: 48,
                  bgcolor: "rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography sx={{ fontSize: 32, fontWeight: 700 }}>12 Thg</Typography>
                <Typography
                  variant="overline"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Bảo hành
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, width: "100%", maxWidth: 560 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: 8,
                aspectRatio: "4/3",
              }}
            >
              <Image
                src={HERO_IMAGE}
                alt="Điện thoại cao cấp"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                  <Box>
                    <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      Mẫu mới nhất
                    </Typography>
                    <Typography variant="h6" sx={{
                      fontWeight: 600
                    }}>
                      iPhone 15 Pro Max
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
