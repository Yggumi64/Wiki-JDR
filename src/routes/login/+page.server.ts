import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Si l'utilisateur est déjà connecté, on le redirige vers ses personnages
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/personnages');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const identity = data.get('identity') as string;
		const password = data.get('password') as string;

		if (!identity || !password) {
			return fail(400, { error: 'Veuillez remplir tous les champs.' });
		}

		try {
			// Authentification auprès de PocketBase
			await locals.pb.collection('users').authWithPassword(identity, password);
		} catch (err : any) {
			console.error('Erreur PocketBase :', err.response); // Affiche le détail dans la console serveur
			return fail(400, { error: err.message || 'Identifiants incorrects.' });
		}

		// Redirection vers la page des personnages après succès
		throw redirect(303, '/personnages');
	}
};