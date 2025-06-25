create extension if not exists "uuid-ossp";

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  due_date timestamp,
  completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

ALTER TABLE tasks
ALTER COLUMN priority TYPE text USING priority::text;

https://supabase.com/dashboard/project/hegyvwrkesaqtwebvarn/sql/cbe2c03c-0d66-43a2-994d-2ba8150fd62c

