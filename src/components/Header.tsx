"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { href: "/", label: "Sản phẩm", match: (path: string) => path === "/" },
  { href: "/admin/login", label: "Admin", match: () => false },
];

export function Header() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
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
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Mở menu"
                  sx={{ mr: 0.5 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
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
            </Stack>

            {!isMobile && (
              <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
                {navLinks.map(({ href, label, match }) => {
                  const active = match(pathname);
                  return (
                    <Typography
                      key={href}
                      component={Link}
                      href={href}
                      sx={{
                        fontSize: 12,
                        fontWeight: active ? 700 : 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        color: active ? "secondary.main" : "text.secondary",
                        borderBottom: active ? "2px solid" : "2px solid transparent",
                        borderColor: active ? "secondary.main" : "transparent",
                        py: 0.5,
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {label}
                    </Typography>
                  );
                })}
              </Stack>
            )}

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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: { sx: { width: 280 } },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontWeight: 700 }}>PhoneShop</Typography>
          <IconButton onClick={closeDrawer} aria-label="Đóng menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f5f3f4",
              borderRadius: 3,
              px: 2,
              py: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
            <InputBase placeholder="Tìm kiếm sản phẩm..." sx={{ flex: 1, fontSize: 14 }} />
          </Box>
        </Box>
        <List sx={{ px: 1 }}>
          {navLinks.map(({ href, label, match }) => {
            const active = match(pathname);
            return (
              <ListItemButton
                key={href}
                component={Link}
                href={href}
                selected={active}
                onClick={closeDrawer}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: { sx: { fontWeight: active ? 700 : 500 } },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
