ALTER TABLE public.work_posts
  ADD COLUMN gif_url text;

ALTER TABLE public.work_posts
  DROP CONSTRAINT IF EXISTS work_posts_preview_source_check;

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-gifs', 'project-gifs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view project gifs"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-gifs');

CREATE POLICY "Admins can upload project gifs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-gifs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project gifs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-gifs' AND public.has_role(auth.uid(), 'admin'));