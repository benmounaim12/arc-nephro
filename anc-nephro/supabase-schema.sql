-- ============================================
-- ANC Néphro Centre — Schema Supabase
-- Copiez-collez ce SQL dans :
-- Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Table des profils membres
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null,
  specialty     text,
  hospital      text,
  phone         text,
  status        text default 'pending' check (status in ('pending', 'active', 'suspended')),
  role          text default 'member'  check (role in ('member', 'admin')),
  member_since  timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Activer Row Level Security
alter table public.profiles enable row level security;

-- Politique : un membre peut lire/modifier son propre profil
create policy "Membres : voir son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Membres : modifier son propre profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Politique : les admins voient tout
create policy "Admins : accès complet"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Index pour les performances
create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists profiles_role_idx   on public.profiles(role);

-- Trigger pour updated_at automatique
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();

-- ============================================
-- CRÉER LE PREMIER ADMIN
-- Après votre première inscription dans l'app,
-- exécutez cette requête en remplaçant l'email :
-- ============================================
-- update public.profiles
-- set role = 'admin', status = 'active'
-- where id = (
--   select id from auth.users where email = 'admin@anc-nephro.ma'
-- );
