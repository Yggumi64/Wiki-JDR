import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Si l'utilisateur est déjà connecté, on le redirige vers ses personnages
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/personnages');
	}
};

export const actions: Actions = {
    default: async ({ request, locals, cookies }) => { // 1. Ajoute 'cookies' ici
        const data = await request.formData();
        const identity = data.get('identity') as string;
        const password = data.get('password') as string;

        if (!identity || !password) {
            return fail(400, { error: 'Veuillez remplir tous les champs.' });
        }

        try {
            // Authentification
            const authData = await locals.pb.collection('users').authWithPassword(identity, password);

            // 2. IMPORTANT : Écrire le cookie de session pour le navigateur !
            cookies.set('pb_auth', locals.pb.authStore.exportToCookie(), {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 60 * 60 * 24 * 7 // 1 semaine
            });

        } catch (err: any) {
            console.error('Erreur PocketBase :', err?.response || err);
            return fail(400, { error: 'Identifiants incorrects.' });
        }

        throw redirect(303, '/personnages');
    }
};