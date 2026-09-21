ALTER TABLE public.work_posts
  ALTER COLUMN html DROP NOT NULL;

ALTER TABLE public.work_posts
  ADD COLUMN project_url text,
  ADD COLUMN description text;

ALTER TABLE public.work_posts
  ADD CONSTRAINT work_posts_preview_source_check
  CHECK (NULLIF(TRIM(project_url), '') IS NOT NULL OR NULLIF(TRIM(html), '') IS NOT NULL);