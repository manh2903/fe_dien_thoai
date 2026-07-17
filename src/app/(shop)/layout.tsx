import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
