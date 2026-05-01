# LHMY.kr Deployment Notes

## Netlify project

- Existing Netlify site: `velvety-licorice-39e58f`
- Site id: `1661fbd0-151d-476c-ab6e-beba1f0c130f`
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## Required environment values

Set these in Netlify project environment variables. Do not commit them to the repo.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_EMAIL`

## Supabase setup

1. Run `supabase/schema.sql` in the Supabase SQL editor.
2. Create an admin user in Supabase Auth.
3. Insert a matching profile row:

```sql
insert into public.profiles (id, email, role)
values ('AUTH_USER_UUID', 'admin@example.com', 'admin');
```

## Cafe24 DNS for Netlify

Cafe24 path: `나의 서비스 관리 > 도메인 관리 > DNS 관리`

- `www.lhmy.kr`: CNAME to `velvety-licorice-39e58f.netlify.app`
- `lhmy.kr`: A record to Netlify fallback IP `75.2.60.5`

Current check on 2026-05-01:

- `lhmy.kr` resolves to `222.122.39.84`, not Netlify.
- `www.lhmy.kr` is a CNAME to `majestic-banoffee-cc4c85.netlify.app`, not the current Netlify project.
- `https://lhmy.kr` did not connect, and `https://www.lhmy.kr` failed certificate trust validation.

Important Cafe24 notes:

- Cafe24 DNS changes are available only when the domain uses Cafe24 nameservers.
- Cafe24 DNS record changes usually reflect within 30-60 minutes, but global propagation may take up to 48 hours.
- Do not set a root/apex CNAME when other root records such as MX are needed.
- Cafe24 CNAME/MX values should be entered without a trailing dot.

Reference:

- https://help.cafe24.com/docs/domain/domain-dns-management-guide/
- https://help.cafe24.com/docs/domain/domain-hosting-external-service-connection/
- https://help.cafe24.com/faq/domain/dns-management/dns-management-detailed-guide/
- https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/
- https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/
