import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check if we have credentials
    const isReady = url && key;

    const cookieStore = await cookies();

    return createServerClient(
        url || 'https://placeholder.supabase.co',
        key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDMwOTEsImV4cCI6MjA4NDExOTA5MX0.placeholder',
        {
            cookies: {
                get(name: string) {
                    if (!isReady) return undefined;
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    if (!isReady) return;
                    try {
                        cookieStore.set({ name, value, ...options })
                    } catch (error) {
                        // Ignore SSR set errors
                    }
                },
                remove(name: string, options: CookieOptions) {
                    if (!isReady) return;
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // Ignore SSR remove errors
                    }
                },
            },
        }
    )
}
