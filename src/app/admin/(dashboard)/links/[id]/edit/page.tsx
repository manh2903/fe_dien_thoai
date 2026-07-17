import { notFound } from "next/navigation";
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
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">Sửa link liên hệ</h1>
      <LinkForm link={link as ContactLink} />
    </div>
  );
}
