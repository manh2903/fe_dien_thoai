import Link from "next/link";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { ContactLinks } from "@/components/ContactLinks";
import { createClient } from "@/lib/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("contact_links")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (
    <Box
      component="footer"
      id="contact"
      sx={{ bgcolor: "#f5f3f4", borderTop: 1, borderColor: "divider", mt: "auto" }}
    >
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3
              }}>
              PhoneShop
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.7
              }}>
              Cửa hàng điện thoại uy tín — máy mới, máy cũ chất lượng, giá tốt.
              Chúng tôi cam kết mang đến giá trị thật cho khách hàng.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <LanguageIcon color="action" />
              <MailOutlinedIcon color="action" />
              <PlaceOutlinedIcon color="action" />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="overline"
              sx={{ display: "block", mb: 3, color: "text.primary" }}
            >
              Sản phẩm
            </Typography>
            <Stack spacing={2}>
              {["Điện thoại iPhone", "Điện thoại Samsung", "Điện thoại Xiaomi", "Máy cũ giá rẻ"].map(
                (label) => (
                  <Link key={label} href="/" style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "secondary.main" },
                      }}
                    >
                      {label}
                    </Typography>
                  </Link>
                )
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="overline"
              sx={{ display: "block", mb: 3, color: "text.primary" }}
            >
              Thông tin
            </Typography>
            <Stack spacing={2}>
              {["Về chúng tôi", "Chính sách bảo hành", "Điều khoản dịch vụ", "Liên hệ"].map(
                (label) => (
                  <Typography
                    key={label}
                    component="span"
                    sx={{
                      color: "text.secondary",
                      cursor: "default"
                    }}>
                    {label}
                  </Typography>
                )
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="overline"
              sx={{ display: "block", mb: 3, color: "text.primary" }}
            >
              Liên hệ
            </Typography>
            <ContactLinks links={links ?? []} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            © {new Date().getFullYear()} PhoneShop. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Quyền riêng tư
            </Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Bản đồ trang
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
