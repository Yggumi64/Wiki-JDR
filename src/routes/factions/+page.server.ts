import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Récupération de toutes les factions depuis PocketBase
	const factions = await locals.pb.collection('FACTION').getFullList({
		sort: 'Name'
	});

	return {
		factions: JSON.parse(JSON.stringify(factions))
	};
};