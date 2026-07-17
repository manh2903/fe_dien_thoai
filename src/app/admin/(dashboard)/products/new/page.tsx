import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">Thêm sản phẩm mới</h1>
      <ProductForm />
    </div>
  );
}
