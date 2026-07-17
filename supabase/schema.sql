-- Chạy file này trong Supabase SQL Editor

-- Bảng sản phẩm điện thoại
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null default '',
  price bigint not null default 0,
  description text default '',
  image_url text default '',
  storage text default '',
  ram text default '',
  color text default '',
  condition text not null default 'new' check (condition in ('new', 'used')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Bảng link liên hệ (Zalo, Facebook, Hotline...)
create table if not exists public.contact_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  icon text not null default 'link' check (icon in ('zalo', 'phone', 'facebook', 'messenger', 'tiktok', 'instagram', 'website', 'link')),
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Trigger cập nhật updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

-- Row Level Security
alter table public.products enable row level security;
alter table public.contact_links enable row level security;

-- Public: đọc sản phẩm & link đang active
create policy "Public read active products"
  on public.products for select
  using (is_active = true);

create policy "Public read active links"
  on public.contact_links for select
  using (is_active = true);

-- Admin: user đã đăng nhập có full quyền
create policy "Admin full access products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin full access links"
  on public.contact_links for all
  to authenticated
  using (true)
  with check (true);

-- Dữ liệu mẫu (tùy chọn)
insert into public.products (name, brand, price, description, storage, ram, color, condition, image_url) values
  ('iPhone 15 Pro Max', 'Apple', 28990000, 'iPhone 15 Pro Max 256GB, máy mới nguyên seal, bảo hành chính hãng 12 tháng.', '256GB', '8GB', 'Titan Tự Nhiên', 'new', 'https://images.unsplash.com/photo-1695048133142-1a2048d98589?w=600&q=80'),
  ('Samsung Galaxy S24 Ultra', 'Samsung', 26990000, 'Galaxy S24 Ultra 512GB, camera 200MP, S Pen tích hợp.', '512GB', '12GB', 'Titanium Gray', 'new', 'https://images.unsplash.com/photo-1610945265064-0e34e55182fa?w=600&q=80'),
  ('Xiaomi 14', 'Xiaomi', 15990000, 'Xiaomi 14 256GB, Leica camera, Snapdragon 8 Gen 3.', '256GB', '12GB', 'Đen', 'new', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80');

insert into public.contact_links (title, url, icon, sort_order) values
  ('Zalo', 'https://zalo.me/0123456789', 'zalo', 1),
  ('Hotline', 'tel:0123456789', 'phone', 2),
  ('Facebook', 'https://facebook.com/yourpage', 'facebook', 3);
