import { Box } from "@mui/material";
import { AdminNav } from "@/components/admin/AdminNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <AdminNav />
      <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
    </Box>
  );
}
