import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // During build time or if keys are missing, provide placeholders
    // to prevent the @supabase/ssr library from throwing an error.
    if (!url || !key) {
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDMwOTEsImV4cCI6MjA4NDExOTA5MX0.placeholder'
        );
    }

    return createBrowserClient(url, key);
}
