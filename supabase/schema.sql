create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  locale text not null default 'ko',
  title text not null default '',
  body text not null default '',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (section_key, locale)
);

create table if not exists public.board_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  cover_image_url text,
  category text not null default 'notice',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  pinned boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  issue_month text not null,
  summary text not null default '',
  editor_note text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_articles (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.newsletter_issues(id) on delete cascade,
  source_post_id uuid references public.board_posts(id) on delete set null,
  title text not null,
  body text not null default '',
  image_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  inquiry_type text,
  message text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  phone text not null,
  email text,
  address text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  phone text not null,
  email text,
  address text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  phone text not null,
  email text,
  address text,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  amount numeric not null,
  donation_type text not null,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists board_posts_status_published_idx
  on public.board_posts(status, published_at desc);

create index if not exists newsletter_issues_status_month_idx
  on public.newsletter_issues(status, issue_month desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.profiles enable row level security;
alter table public.site_sections enable row level security;
alter table public.board_posts enable row level security;
alter table public.newsletter_issues enable row level security;
alter table public.newsletter_articles enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.student_applications enable row level security;
alter table public.volunteer_applications enable row level security;
alter table public.partner_applications enable row level security;
alter table public.donations enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

drop policy if exists "Public can read published posts" on public.board_posts;
create policy "Public can read published posts"
  on public.board_posts for select
  using (status = 'published');

drop policy if exists "Editors manage posts" on public.board_posts;
create policy "Editors manage posts"
  on public.board_posts for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read published newsletters" on public.newsletter_issues;
create policy "Public can read published newsletters"
  on public.newsletter_issues for select
  using (status = 'published');

drop policy if exists "Editors manage newsletters" on public.newsletter_issues;
create policy "Editors manage newsletters"
  on public.newsletter_issues for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read articles from published newsletters" on public.newsletter_articles;
create policy "Public can read articles from published newsletters"
  on public.newsletter_articles for select
  using (
    exists (
      select 1
      from public.newsletter_issues
      where newsletter_issues.id = newsletter_articles.issue_id
        and newsletter_issues.status = 'published'
    )
  );

drop policy if exists "Editors manage newsletter articles" on public.newsletter_articles;
create policy "Editors manage newsletter articles"
  on public.newsletter_articles for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read site sections" on public.site_sections;
create policy "Public can read site sections"
  on public.site_sections for select
  using (true);

drop policy if exists "Editors manage site sections" on public.site_sections;
create policy "Editors manage site sections"
  on public.site_sections for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read site images" on storage.objects;
create policy "Public can read site images"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "Editors upload site images" on storage.objects;
create policy "Editors upload site images"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Editors update site images" on storage.objects;
create policy "Editors update site images"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Editors delete site images" on storage.objects;
create policy "Editors delete site images"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Editors read contact inquiries" on public.contact_inquiries;
create policy "Editors read contact inquiries"
  on public.contact_inquiries for select
  using (public.is_admin());

drop policy if exists "Anyone can create contact inquiries" on public.contact_inquiries;
create policy "Anyone can create contact inquiries"
  on public.contact_inquiries for insert
  with check (true);

drop policy if exists "Editors update contact inquiries" on public.contact_inquiries;
create policy "Editors update contact inquiries"
  on public.contact_inquiries for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can create student applications" on public.student_applications;
create policy "Anyone can create student applications"
  on public.student_applications for insert
  with check (true);

drop policy if exists "Editors manage student applications" on public.student_applications;
create policy "Editors manage student applications"
  on public.student_applications for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can create volunteer applications" on public.volunteer_applications;
create policy "Anyone can create volunteer applications"
  on public.volunteer_applications for insert
  with check (true);

drop policy if exists "Editors manage volunteer applications" on public.volunteer_applications;
create policy "Editors manage volunteer applications"
  on public.volunteer_applications for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can create partner applications" on public.partner_applications;
create policy "Anyone can create partner applications"
  on public.partner_applications for insert
  with check (true);

drop policy if exists "Editors manage partner applications" on public.partner_applications;
create policy "Editors manage partner applications"
  on public.partner_applications for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can create donations" on public.donations;
create policy "Anyone can create donations"
  on public.donations for insert
  with check (true);

drop policy if exists "Editors manage donations" on public.donations;
create policy "Editors manage donations"
  on public.donations for all
  using (public.is_admin())
  with check (public.is_admin());
