import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Character } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	// 1. Redirection si l'utilisateur n'est pas connecté
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// 2. Détermination du filtre selon le rôle
	// Adapte la condition selon la manière dont tu identifies un admin (ex: locals.user.role === 'admin' ou locals.user.isAdmin)
	const isAdmin = locals.user.role === 'admin' || locals.user.isAdmin === true;

	// Si admin : aucun filtre (chaine vide), sinon : filtre sur l'Owner
	const filterQuery = isAdmin ? '' : `Owner = "${locals.user.id}"`;

	// 3. Récupération des personnages dans PocketBase
	const characters = await locals.pb.collection('CHARACTER').getFullList<Character>({
		filter: filterQuery,
		sort: '-created',
		expand: 'Skills,Owner,Affiliation'
	});

	return {
		characters: JSON.parse(JSON.stringify(characters)),
		isAdmin
	};
};