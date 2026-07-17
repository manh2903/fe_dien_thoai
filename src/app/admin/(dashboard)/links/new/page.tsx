import { LinkForm } from "@/components/admin/LinkForm";

export default function NewLinkPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">Thêm link liên hệ</h1>
      <LinkForm />
    </div>
  );
}
