"use client";

import Link from "next/link";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: { xs: 64, md: 80 },
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 1 }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              whiteSpace: "nowrap",
            }}
          >
            PhoneShop
          </Typography>

          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", flexShrink: 0 }}>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                bgcolor: "#f5f3f4",
                borderRadius: 999,
                px: 2,
                py: 0.75,
                border: "1px solid",
                borderColor: "divider",
                width: { lg: 220, xl: 260 },
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
              <InputBase
                placeholder="Tìm kiếm..."
                sx={{ flex: 1, fontSize: 14 }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            <IconButton
              component="a"
              href="#contact"
              size={isMobile ? "small" : "medium"}
              sx={{
                bgcolor: alpha("#0F172A", 0.04),
                "&:hover": { bgcolor: alpha("#0F172A", 0.08) },
              }}
            >
              <ChatBubbleOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="tel:0123456789"
              size={isMobile ? "small" : "medium"}
              sx={{
                bgcolor: alpha("#0F172A", 0.04),
                "&:hover": { bgcolor: alpha("#0F172A", 0.08) },
              }}
            >
              <CallOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size={isMobile ? "small" : "medium"}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: alpha("#0F172A", 0.04),
                "&:hover": { bgcolor: alpha("#0F172A", 0.08) },
              }}
            >
              <ShareOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
