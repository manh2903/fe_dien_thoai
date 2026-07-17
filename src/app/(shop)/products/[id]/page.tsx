import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductDetail } from "./ProductDetail";
import type { Product } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!product) notFound();

  return <ProductDetail product={product as Product} />;
}
