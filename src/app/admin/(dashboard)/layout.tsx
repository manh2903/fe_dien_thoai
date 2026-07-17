import { Box } from "@mui/material";
import { AdminNav } from "@/components/admin/AdminNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <AdminNav />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: "auto",
          minWidth: 0,
          pb: { xs: 2, md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
