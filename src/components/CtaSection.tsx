"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ForumIcon from "@mui/icons-material/Forum";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import type { ContactLink } from "@/types/database";

interface CtaSectionProps {
  links: ContactLink[];
}

export function CtaSection({ links }: CtaSectionProps) {
  const phone = links.find((l) => l.icon === "phone");
  const zalo = links.find((l) => l.icon === "zalo");

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mb: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          bgcolor: "primary.main",
          borderRadius: { xs: 4, md: 8 },
          p: { xs: 3, sm: 4, md: 6 },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            opacity: 0.2,
            background: "linear-gradient(to left, #2563EB, transparent)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, flex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontSize: { xs: 28, md: 40 },
              fontWeight: 700,
              mb: 3,
            }}
          >
            Bạn đang tìm mẫu điện thoại cụ thể?
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.65)",
              fontSize: { xs: 16, md: 18 },
              mb: 4,
              maxWidth: 480,
            }}
          >
            Liên hệ ngay để nhận báo giá tốt nhất và các chương trình khuyến mãi
            độc quyền chỉ có tại PhoneShop.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            sx={{ flexWrap: "wrap", width: "100%" }}
          >
            <Button
              component="a"
              href={phone?.url ?? "tel:0123456789"}
              variant="contained"
              color="secondary"
              startIcon={<CallIcon />}
              sx={{
                px: 4,
                py: 1.75,
                borderRadius: 3,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Gọi Hotline
            </Button>
            <Button
              component="a"
              href={zalo?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<ForumIcon />}
              sx={{
                px: 4,
                py: 1.75,
                borderRadius: 3,
                width: { xs: "100%", sm: "auto" },
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderColor: "rgba(255,255,255,0.4)",
                },
              }}
            >
              Nhắn tin Zalo
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: { xs: 120, sm: 160, md: 192 },
            height: { xs: 120, sm: 160, md: 192 },
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mx: "auto",
          }}
        >
          <SmartphoneIcon
            sx={{
              fontSize: { xs: 48, md: 64 },
              color: "rgba(255,255,255,0.5)",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
