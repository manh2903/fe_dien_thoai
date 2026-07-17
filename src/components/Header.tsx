"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppBar position="sticky" elevation={0} sx={{ height: 80, justifyContent: "center" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 2 }}>
          <Typography
            component={Link}
            href="/"
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            PhoneShop
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Typography
              component={Link}
              href="/"
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isHome ? "secondary.main" : "text.secondary",
                borderBottom: isHome ? "2px solid" : "2px solid transparent",
                borderColor: isHome ? "secondary.main" : "transparent",
                py: 0.5,
                "&:hover": { color: "primary.main" },
              }}
            >
              Sản phẩm
            </Typography>
            <Typography
              component={Link}
              href="/admin/login"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Admin
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{
            alignItems: "center"
          }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                bgcolor: "#f5f3f4",
                borderRadius: 999,
                px: 2,
                py: 0.75,
                border: "1px solid",
                borderColor: "divider",
                width: 260,
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
              <InputBase
                placeholder="Tìm kiếm sản phẩm..."
                sx={{ flex: 1, fontSize: 14 }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            <IconButton
              component="a"
              href="#contact"
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
              sx={{
                bgcolor: alpha("#0F172A", 0.04),
                "&:hover": { bgcolor: alpha("#0F172A", 0.08) },
              }}
            >
              <CallOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
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
