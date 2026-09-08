import fs from 'fs';
import Papa from 'papaparse';
import PocketBase from 'pocketbase';

// CONFIGURATION
const PB_URL = 'https://wiki-jdr.onrender.com'; // Change avec ton URL Render ou locale
const ADMIN_EMAIL = 'subiasnino@gmail.com';
const ADMIN_PASSWORD = 'Admin123';
const FACTION_ID = 'xea8h60mmhlhymo'; // Pense à mettre le bon ID de Faction présent sur Render
const CSV_FILE = 'backend/pacifistes.csv';

const pb = new PocketBase(PB_URL);

// Fonction helper pour nettoyer et convertir le Tier en Integer
function parseTier(rawTier) {
	if (!rawTier) return 1;
	// Extrait tous les chiffres de la chaîne (ex: "Tier 1" -> "1")
	const digits = String(rawTier).replace(/\D/g, '');
	return digits ? parseInt(digits, 10) : 1;
}

async function run() {
	try {
		// Authentification Admin sur le serveur
		await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
		console.log('🔑 Authentification réussie !');

		const fileContent = fs.readFileSync(CSV_FILE, 'utf8');

		Papa.parse(fileContent, {
			header: true,
			skipEmptyLines: true,
			complete: async (results) => {
				for (const row of results.data) {
					const name = row.nom || row.Name;
					const description = row.description || row.Description;
					const rawTier = row.tier || row.Tier;

					const cleanTier = parseTier(rawTier);

					try {
						await pb.collection('CLASSE').create({
							Name: name,
							Description: description,
							Tier: cleanTier,
							Faction: FACTION_ID
						});
						console.log(`✅ Importé : ${name} (Tier ${cleanTier})`);
					} catch (err) {
						console.error(`❌ Échec sur ${name} :`, err.message);
					}
				}
				console.log('\n🎉 Importation terminée !');
			}
		});
	} catch (err) {
		console.error('❌ Connexion impossible :', err.message);
	}
}

run();