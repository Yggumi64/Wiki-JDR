import PocketBase from 'pocketbase';
import Papa from 'papaparse';
import fs from 'fs';

// CONFIG RAPIDE
const PB_URL = 'http://127.0.0.1:8090';
const ADMIN_EMAIL = 'subiasnino@gmail.com';
const ADMIN_PASSWORD = 'Admin123';
const FACTION_ID = 'cwhwf4kk9ytkej9'; // Requis pour la relation
const CSV_FILE = 'backend/pacifistes.csv';  // Change le nom pour chaque CSV

const pb = new PocketBase(PB_URL);

async function run() {
	const fileContent = fs.readFileSync(CSV_FILE, 'utf8');
	
	Papa.parse(fileContent, {
		header: true,
		skipEmptyLines: true,
		complete: async (results) => {
			for (const row of results.data) {
				await pb.collection('CLASSE').create({
					Name: row.nom || row.Name,
					Description: row.description || row.Description,
					Tier: parseInt(row.tier || row.Tier),
					Faction: FACTION_ID
				});
				console.log('OK:', row.nom || row.Name);
			}
			console.log('Fini !');
		}
	});
}

run();