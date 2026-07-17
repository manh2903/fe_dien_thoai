import { Box, Typography } from "@mui/material";
import { LinkForm } from "@/components/admin/LinkForm";

export default function NewLinkPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3
        }}>
        Thêm link liên hệ
      </Typography>
      <LinkForm />
    </Box>
  );
}
