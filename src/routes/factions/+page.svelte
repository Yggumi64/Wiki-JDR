<script lang="ts">
	import { onMount } from 'svelte';
	import Papa from 'papaparse';

	let { data } = $props();

	// Faction sélectionnée (par défaut la première disponible)
	let selectedFactionId = $state<string>(data.factions[0]?.id || '');

	// Données CSV des classes
	let allCsvClasses = $state<any[]>([]);
	let isLoadingCsv = $state<boolean>(true);

	// Dérivation de la faction active
	let activeFaction = $derived(
		data.factions.find((f: any) => f.id === selectedFactionId) || data.factions[0]
	);

	// Dérivation des classes filtrées pour la faction sélectionnée
	let activeClasses = $derived(
		allCsvClasses.filter(
			(c) => c.Faction?.trim().toLowerCase() === activeFaction?.Name?.trim().toLowerCase()
		)
	);

	// Chargement du CSV au montage de la page
	onMount(async () => {
		try {
			const res = await fetch('/classes.csv');
			const csvText = await res.text();

			Papa.parse(csvText, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					allCsvClasses = results.data;
					isLoadingCsv = false;
				}
			});
		} catch (err) {
			console.error('Erreur lors du chargement du fichier CSV :', err);
			isLoadingCsv = false;
		}
	});

	function selectFaction(id: string) {
		selectedFactionId = id;
	}
</script>

<div class="wiki-layout">
	<!-- Navigation Factions -->
	<nav class="faction-nav">
		<h2>Factions</h2>
		<ul>
			{#each data.factions as faction}
				<li>
					<button
						type="button"
						class="nav-btn"
						class:active={faction.id === activeFaction?.id}
						onclick={() => selectFaction(faction.id)}
					>
						🛡️ {faction.Name}
					</button>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Contenu Principal -->
	<main class="faction-content">
		{#if activeFaction}
			<h1>🛡️ {activeFaction.Name}</h1>

			<!-- Badges de la Faction -->
			<div class="faction-badge-container">
				{#if activeFaction.Color}
					<span class="faction-badge badge-color">🎨 Couleur : {activeFaction.Color}</span>
				{/if}
				{#if activeFaction.Values}
					<span class="faction-badge badge-valeur">⚖️ Valeurs : {activeFaction.Values}</span>
				{/if}
			</div>

			<!-- Section Histoire & Informations -->
			<details class="collapsible" open>
				<summary>📜 Histoire & Présentation de la faction</summary>
				<div class="details-content">
					{#if activeFaction.Description}
						<p class="description-text">{activeFaction.Description}</p>
					{/if}

					{#if activeFaction.Politics}
						<div class="faction-section">
							<h2>Politique</h2>
							<p>{activeFaction.Politics}</p>
						</div>
					{/if}

					{#if activeFaction.Relations}
						<div class="faction-section">
							<h2>Relations</h2>
							<p>{activeFaction.Relations}</p>
						</div>
					{/if}

					{#if activeFaction.Economy}
						<div class="faction-section">
							<h2>Économie & Géographie</h2>
							<p>{activeFaction.Economy}</p>
						</div>
					{/if}

					{#if activeFaction.TreeImage}
						<div class="faction-section">
							<h2>Arbre de classes</h2>
							<img
								src={`http://127.0.0.1:8090/api/files/FACTION/${activeFaction.id}/${activeFaction.TreeImage}`}
								alt="Arbre de classes"
								class="class-tree-img"
							/>
						</div>
					{/if}
				</div>
			</details>

			<!-- Section Classes (Importées du CSV) -->
			<details class="collapsible" open>
				<summary>⚔️ Classes de la faction ({activeClasses.length})</summary>
				<div class="details-content">
					{#if isLoadingCsv}
						<p>Chargement des classes depuis le fichier CSV...</p>
					{:else if activeClasses.length > 0}
						{#each activeClasses as item}
							<details class="class-item">
								<summary>{item.Name} {item.Tier ? `(Tiers ${item.Tier})` : ''}</summary>
								{#if item.Parents}
									<div class="class-desc breadcrumb">
										<em>{item.Parents} -> {item.Name}</em>
									</div>
								{/if}
								<div class="class-desc">
									{item.Description}
								</div>
							</details>
						{/each}
					{:else}
						<p class="empty-msg">Aucune classe répertoriée dans le CSV pour cette faction.</p>
					{/if}
				</div>
			</details>
		{:else}
			<p>Aucune faction sélectionnée.</p>
		{/if}
	</main>
</div>

<style>
	.wiki-layout {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 768px) {
		.wiki-layout {
			grid-template-columns: 1fr;
		}
	}

	/* Navigation Factions */
	.faction-nav {
		background: #16213e;
		color: white;
		padding: 1.25rem;
		border-radius: 8px;
	}

	.faction-nav h2 {
		font-size: 1.1rem;
		margin-top: 0;
		border-bottom: 2px solid #e94560;
		padding-bottom: 0.5rem;
	}

	.faction-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-btn {
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		color: #ccd6f6;
		padding: 0.6rem 0.8rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.95rem;
		transition: background 0.2s;
	}

	.nav-btn:hover,
	.nav-btn.active {
		background-color: #0f3460;
		color: white;
		font-weight: bold;
	}

	/* Contenu Principal */
	.faction-content h1 {
		color: #16213e;
		border-bottom: 3px solid #e94560;
		padding-bottom: 8px;
		margin-top: 0;
	}

	.faction-badge-container {
		display: flex;
		gap: 15px;
		margin: 15px 0 25px 0;
		flex-wrap: wrap;
	}

	.faction-badge {
		padding: 8px 16px;
		border-radius: 20px;
		font-weight: bold;
		font-size: 0.9em;
		color: white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	}

	.badge-color {
		background-color: #2b580c;
	}
	.badge-valeur {
		background-color: #0f3460;
	}

	/* Collapsibles */
	details.collapsible {
		background: #ffffff;
		border: 1px solid #cbd5e1;
		border-radius: 6px;
		margin-bottom: 15px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
		overflow: hidden;
	}

	details.collapsible summary {
		padding: 12px 18px;
		font-weight: bold;
		cursor: pointer;
		background-color: #f8fafc;
		color: #16213e;
		user-select: none;
		outline: none;
	}

	details.collapsible summary:hover {
		background-color: #f1f5f9;
	}

	.details-content {
		padding: 15px 20px;
		border-top: 1px solid #cbd5e1;
	}

	.faction-section {
		background: #f8fafc;
		padding: 15px;
		margin-bottom: 15px;
		border-radius: 6px;
		border-left: 4px solid #0f3460;
	}

	.faction-section h2 {
		color: #0f3460;
		margin-top: 0;
		font-size: 1.05rem;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 5px;
	}

	.class-tree-img {
		max-width: 100%;
		border-radius: 8px;
		margin-top: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	/* Imbrication des Classes */
	details.class-item {
		border: 1px solid #e2e8f0;
		border-radius: 4px;
		margin-bottom: 8px;
		background: #fafafa;
	}

	details.class-item summary {
		padding: 8px 14px;
		font-weight: 600;
		color: #0f3460;
		background: #ffffff;
		cursor: pointer;
	}

	details.class-item summary:hover {
		background: #f1f5f9;
	}

	.class-desc {
		padding: 10px 14px;
		font-size: 0.95em;
		color: #334155;
		border-top: 1px solid #e2e8f0;
	}

	.breadcrumb {
		background: #f1f5f9;
		color: #64748b;
		padding: 4px 14px;
	}

	.empty-msg {
		color: #64748b;
		font-style: italic;
	}
</style>