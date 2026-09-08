import PocketBase from 'pocketbase';

// Tes deux instances PocketBase
const localPb = new PocketBase('http://127.0.0.1:8090');
const renderPb = new PocketBase('[https://wiki-jdr.onrender.com](https://wiki-jdr.onrender.com)');

// Collections à transférer (dans l'ordre pour respecter les relations)
const COLLECTIONS = ['FACTIONS', 'SKILL', 'CLASSE', 'CHARACTER'];

async function sync() {
	// Connexion admin sur Render
    try {
		// Essaye de se connecter avec l'ancienne méthode d'admin
		await renderPb.admins.authWithPassword('subiasnino@gmail.com', 'S1kk1m*leChat');
		console.log('🔑 Authentification réussie sur Render');

        for (const collectionName of COLLECTIONS) {
			console.log(`\nTransfert de : ${collectionName}...`);
			const records = await localPb.collection(collectionName).getFullList();

			for (const record of records) {
				try {
					// Envoie du fichier / données brutes
					await renderPb.collection(collectionName).create(record);
					console.log(`✅ ${collectionName} importé (ID: ${record.id})`);
				} catch (err) {
					// Si l'entrée existe déjà, on effectue une mise à jour
					if (err.status === 400) {
						await renderPb.collection(collectionName).update(record.id, record);
						console.log(`🔄 ${collectionName} mis à jour (ID: ${record.id})`);
					} else {
						console.error(`❌ Erreur sur ${collectionName} (${record.id}) :`, err.message);
					}
				}
			}
		}
		console.log('\n🎉 Synchronisation terminée !');
	} catch (err) {
		console.error('Erreur globale :', err.message);
	}
}

sync();