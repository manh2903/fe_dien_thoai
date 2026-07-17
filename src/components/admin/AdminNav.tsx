"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/products", label: "Sản phẩm", icon: Inventory2OutlinedIcon },
  { href: "/admin/links", label: "Link liên hệ", icon: LinkOutlinedIcon },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
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
      <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 2.5 }}>
        <Typography sx={{
          fontWeight: 700
        }}>Admin Panel</Typography>
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
          sx={{ justifyContent: "flex-start", mb: 1, color: "text.secondary" }}
        >
          Xem cửa hàng
        </Button>
        <Button
          fullWidth
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ justifyContent: "flex-start" }}
        >
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
}
