import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

export const handle: Handle = async ({ event, resolve }) => {
    // Utilisation de la variable dynamique avec fallback explicite
    const pbUrl = env.PUBLIC_PB_URL || 'https://wiki-svelte.fly.dev';
    
    event.locals.pb = new PocketBase(pbUrl);

    // Charge la session depuis le cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            event.locals.user = event.locals.pb.authStore.model;
        }
    } catch (_) {
        event.locals.pb.authStore.clear();
        event.locals.user = null;
    }

    const response = await resolve(event);

    // Exporte le cookie sécurisé (compatible HTTPS / Vercel)
    response.headers.append(
        'set-cookie',
        event.locals.pb.authStore.exportToCookie({ 
            secure: true,
            sameSite: 'lax',
            httpOnly: true
        })
    );

    return response;
};