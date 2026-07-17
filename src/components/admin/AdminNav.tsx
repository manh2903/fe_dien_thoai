"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/products", label: "Sản phẩm", icon: Inventory2OutlinedIcon },
  { href: "/admin/links", label: "Link liên hệ", icon: LinkOutlinedIcon },
];

function NavContent({
  pathname,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 2.5 }}>
        <Typography sx={{ fontWeight: 700 }}>Admin Panel</Typography>
      </Box>
      <Divider />
      <List sx={{ flex: 1, px: 1, py: 1.5 }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              selected={active}
              onClick={onNavigate}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon fontSize="small" color={active ? "secondary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 1.5 }}>
        <Button
          component={Link}
          href="/"
          fullWidth
          startIcon={<StorefrontOutlinedIcon />}
          onClick={onNavigate}
          sx={{ justifyContent: "flex-start", mb: 1, color: "text.secondary" }}
        >
          Xem cửa hàng
        </Button>
        <Button
          fullWidth
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{ justifyContent: "flex-start" }}
        >
          Đăng xuất
        </Button>
      </Box>
    </>
  );
}

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const closeDrawer = () => setDrawerOpen(false);

  if (isMobile) {
    return (
      <>
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={() => setDrawerOpen(true)} aria-label="Mở menu admin">
              <MenuIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 700, ml: 1 }}>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={closeDrawer}
          slotProps={{
            paper: {
              sx: { width: 260, display: "flex", flexDirection: "column" },
            },
          }}
        >
          <NavContent
            pathname={pathname}
            onNavigate={closeDrawer}
            onLogout={handleLogout}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavContent pathname={pathname} onLogout={handleLogout} />
    </Box>
  );
}
