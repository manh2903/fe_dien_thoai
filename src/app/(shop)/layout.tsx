import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import { PurchaseTicker } from "@/components/PurchaseTicker";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import purchaseData from "@/data/purchase-notifications.json";
import {
  preparePurchaseNotifications,
  shuffleNotifications,
  type PurchaseNotification,
} from "@/lib/purchase-notifications";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = preparePurchaseNotifications(
    shuffleNotifications(purchaseData as PurchaseNotification[])
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <Header />
      <PurchaseTicker notifications={notifications} />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
      <BackToTop />
    </Box>
  );
}
