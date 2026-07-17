"use client";

import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const features = [
  {
    icon: VerifiedUserOutlinedIcon,
    title: "Bảo hành 12 tháng",
    desc: "Chính sách lỗi 1 đổi 1",
  },
  {
    icon: PaymentsOutlinedIcon,
    title: "Hỗ trợ trả góp 0%",
    desc: "Thủ tục nhanh chóng",
  },
  {
    icon: LocalShippingOutlinedIcon,
    title: "Giao hàng miễn phí",
    desc: "Toàn quốc trong 2 giờ",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "Hỗ trợ 24/7",
    desc: "Tư vấn tận tâm",
  },
];

export function FeaturesBanner() {
  return (
    <Box
      sx={{
        bgcolor: "#F8FAFC",
        py: { xs: 4, md: 6 },
        borderTop: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4}>
          {features.map(({ icon: Icon, title, desc }) => (
            <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack direction="row" spacing={2} sx={{
                alignItems: "center"
              }}>
                <Box
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.1)",
                    p: 1.5,
                    borderRadius: 3,
                    display: "flex",
                  }}
                >
                  <Icon color="secondary" />
                </Box>
                <Box>
                  <Typography sx={{
                    fontWeight: 700
                  }}>{title}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600
                    }}>
                    {desc}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
