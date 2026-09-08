import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
    // 1. On pointe vers Fly.io (via la variable d'env, ou fallback direct)
    const pbUrl = PUBLIC_PB_URL || 'https://wiki-svelte.fly.dev';
    event.locals.pb = new PocketBase(pbUrl);

    // Charge la session depuis les cookies
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

    // 2. On exporte le cookie sécurisé (https pour Vercel)
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