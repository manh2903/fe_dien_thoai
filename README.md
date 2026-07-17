# PhoneShop - Cửa hàng điện thoại

Website cửa hàng bán điện thoại xây dựng bằng **Next.js 16** + **Supabase**. Không có thanh toán — chỉ hiển thị sản phẩm và link liên hệ (Zalo, Hotline, Facebook...). Admin đăng nhập để thêm/sửa/xóa sản phẩm và link.

## Tính năng

- **Trang cửa hàng**: Danh sách sản phẩm, chi tiết sản phẩm, nút liên hệ nổi
- **Admin panel**: CRUD sản phẩm + CRUD link liên hệ
- **Xác thực**: Supabase Auth (email/password)

## Cài đặt

### 1. Clone & cài dependencies

```bash
npm install
```

### 2. Tạo project Supabase

1. Vào [supabase.com](https://supabase.com) → tạo project mới
2. Vào **SQL Editor** → chạy nội dung file `supabase/schema.sql`
3. Vào **Authentication → Users** → **Add user** → tạo tài khoản admin (email + password)

### 3. Cấu hình biến môi trường

Copy file `.env.local.example` thành `.env.local`:

```bash
cp .env.local.example .env.local
```

Điền thông tin từ Supabase (**Project Settings → API**):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### 4. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

- **Cửa hàng**: `/`
- **Admin login**: `/admin/login`
- **Quản lý sản phẩm**: `/admin/products`
- **Quản lý link**: `/admin/links`

## Cấu trúc database

### `products`
| Cột | Mô tả |
|-----|-------|
| name, brand, price | Thông tin cơ bản |
| storage, ram, color | Thông số kỹ thuật |
| condition | `new` hoặc `used` |
| image_url | URL ảnh sản phẩm |
| is_active | Hiển thị/ẩn trên cửa hàng |

### `contact_links`
| Cột | Mô tả |
|-----|-------|
| title | Tên hiển thị (Zalo, Hotline...) |
| url | Link đích |
| icon | zalo, phone, facebook, messenger, tiktok, instagram, website, link |
| sort_order | Thứ tự hiển thị |
| is_active | Hiển thị/ẩn |

## Bảo mật (RLS)

- Khách (anonymous): chỉ **đọc** sản phẩm/link đang active
- User đã đăng nhập: **full quyền** CRUD

## Tech stack

- Next.js 16 (App Router)
- Supabase (PostgreSQL + Auth)
- Tailwind CSS 4
- TypeScript
