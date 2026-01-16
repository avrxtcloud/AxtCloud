import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (typeof window !== 'undefined') {
        console.log('Supabase check:', url ? 'URL detected' : 'URL MISSING');
    }

    // During build time or if keys are missing, provide placeholders
    // to prevent the @supabase/ssr library from throwing an error.
    if (!url || !key) {
        return createBrowserClient(
            'https://wlfijditizclqsjpxpql.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZmlqZGl0aXpjbHFzanB4cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDMwOTEsImV4cCI6MjA4NDExOTA5MX0.W8_irAtKXGw_Fk4tTeA8x5YXOqsvkdaRAB0sAesJ3cg'
        );
    }

    return createBrowserClient(url, key);
}
