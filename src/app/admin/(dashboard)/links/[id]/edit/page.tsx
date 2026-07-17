import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { createClient } from "@/lib/supabase/server";
import { LinkForm } from "@/components/admin/LinkForm";
import type { ContactLink } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLinkPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: link } = await supabase
    .from("contact_links")
    .select("*")
    .eq("id", id)
    .single();

  if (!link) notFound();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3
        }}>
        Sửa link liên hệ
      </Typography>
      <LinkForm link={link as ContactLink} />
    </Box>
  );
}
