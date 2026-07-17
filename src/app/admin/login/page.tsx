"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Email hoặc mật khẩu không đúng");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAFC",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            mb: 3
          }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              bgcolor: "secondary.main",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SmartphoneIcon />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mt: 2
            }}>
            Đăng nhập Admin
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Quản lý cửa hàng điện thoại
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleLogin}>
          <Stack spacing={2.5}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
            <TextField
              label="Mật khẩu"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Stack>
        </Box>

        <Typography
          component={Link}
          href="/"
          variant="body2"
          color="secondary"
          sx={{
            display: "block",
            textAlign: "center",
            mt: 3,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          ← Về trang cửa hàng
        </Typography>
      </Paper>
    </Box>
  );
}
