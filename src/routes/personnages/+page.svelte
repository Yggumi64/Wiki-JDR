<script lang="ts">
	import type { Character } from '$lib/types';

	let { data } = $props();

	// Gestion du personnage sélectionné
	let selectedCharacter = $state<Character | null>(null);

	function selectCharacter(char: Character) {
		selectedCharacter = char;
	}

	function closeDetails() {
		selectedCharacter = null;
	}

	// Fonction de tri des compétences : Passifs en premier, puis Actifs
	function getSortedSkills(skills: any[]) {
		if (!skills) return [];
		return [...skills].sort((a, b) => {
			if (a.Passive === b.Passive) return 0;
			return a.Passive ? -1 : 1; // `true` (passif) passe avant `false` (actif)
		});
	}
</script>

<div class="page-container">
	<header class="page-header">
		<h1>Mes Personnages</h1>
		<p>Consultez la liste et le détail de vos personnages.</p>
	</header>

	<div class="content-layout">
		<!-- Grille des personnages du joueur -->
		<section class="character-grid">
			{#each data.characters as char}
				<button 
					type="button"
					class="card" 
					class:selected={selectedCharacter?.id === char.id}
					onclick={() => selectCharacter(char)}
				>
					<div class="card-header">
						<h2>{char.Name}</h2>
						{#if char.NPC}
							<span class="badge npc">PNJ</span>
						{:else}
							<span class="badge player">PJ</span>
						{/if}
					</div>

					{#if char.Title}
						<p class="title-text"><em>{char.Title}</em></p>
					{/if}

					<!-- Affichage des Affiliations -->
					{#if char.expand?.Affiliation && char.expand.Affiliation.length > 0}
						<div class="faction-tag">
							🛡️ {char.expand.Affiliation.map((f: { Name: any; }) => f.Name).join(', ')}
						</div>
					{/if}

					<p class="description-preview">{char.Description || 'Aucune description disponible.'}</p>
				</button>
			{:else}
				<p class="empty-msg">Vous n'avez aucun personnage enregistré pour le moment.</p>
			{/each}
		</section>

		<!-- Panneau de détails (Fiche Personnage) -->
		{#if selectedCharacter}
			<aside class="detail-panel">
				<button type="button" class="close-btn" onclick={closeDetails} aria-label="Fermer">×</button>
				
				<div class="panel-content">
					<div class="panel-header">
						<h2>{selectedCharacter.Name}</h2>
						{#if selectedCharacter.Title}
							<p class="subtitle">{selectedCharacter.Title}</p>
						{/if}
					</div>

					<div class="info-group">
						<span class="label">Type</span>
						<span>{selectedCharacter.NPC ? 'Personnage Non Joueur (PNJ)' : 'Personnage Joueur'}</span>
					</div>

					{#if selectedCharacter.expand?.Owner}
						<div class="info-group">
							<span class="label">Propriétaire</span>
							<span>{selectedCharacter.expand.Owner.name || selectedCharacter.expand.Owner.username}</span>
						</div>
					{/if}

					<!-- Toutes les Affiliations / Factions -->
					{#if selectedCharacter.expand?.Affiliation && selectedCharacter.expand.Affiliation.length > 0}
						<div class="info-group">
							<span class="label">Affiliations</span>
							<ul class="affiliation-list">
								{#each selectedCharacter.expand.Affiliation as faction}
									<li>🛡️ <strong>{faction.Name}</strong></li>
								{/each}
							</ul>
						</div>
					{/if}

					<div class="info-group">
						<span class="label">Histoire / Description</span>
						<p class="full-description">{selectedCharacter.Description || 'Aucune biographie rédigée.'}</p>
					</div>

					<!-- Liste de TOUTES les Compétences (Triées : Passifs puis Actifs) -->
					{#if selectedCharacter.expand?.Skills && selectedCharacter.expand.Skills.length > 0}
						<div class="info-group">
							<span class="label">Compétences ({selectedCharacter.expand.Skills.length})</span>
							<div class="skills-list">
								{#each getSortedSkills(selectedCharacter.expand.Skills) as skill}
									<div class="skill-card" class:passive={skill.Passive}>
										<div class="skill-header">
											<strong>{skill.Name}</strong>
											<span class="skill-type-badge">
												{skill.Passive ? 'Passif' : 'Actif'}
											</span>
										</div>
										{#if skill.Cost}
											<small class="skill-cost">Coût : {skill.Cost}</small>
										{/if}
										{#if skill.Description}
											<p class="skill-desc">{skill.Description}</p>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</aside>
		{/if}
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.content-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (min-width: 900px) {
		.content-layout {
			grid-template-columns: 1fr 380px;
		}
	}

	.character-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
	}

	.card {
		background: white;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		padding: 1.25rem;
		text-align: left;
		cursor: pointer;
		transition: transform 0.15s ease, border-color 0.15s ease;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card:hover {
		transform: translateY(-2px);
		border-color: #0f3460;
	}

	.card.selected {
		border-color: #e94560;
		box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.2);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-header h2 {
		font-size: 1.1rem;
		margin: 0;
		color: #1a202c;
	}

	.badge {
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.badge.npc { background: #fef08a; color: #854d0e; }
	.badge.player { background: #bbf7d0; color: #166534; }

	.title-text {
		font-size: 0.85rem;
		color: #4a5568;
		margin: 0;
	}

	.faction-tag {
		font-size: 0.8rem;
		font-weight: 600;
		color: #2b6cb0;
	}

	.description-preview {
		font-size: 0.85rem;
		color: #718096;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0;
	}

	.detail-panel {
		background: white;
		border: 1px solid #cbd5e1;
		border-radius: 8px;
		padding: 1.5rem;
		position: relative;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #64748b;
	}

	.panel-header {
		margin-bottom: 1.5rem;
		border-bottom: 2px solid #f1f5f9;
		padding-bottom: 0.75rem;
	}

	.panel-header h2 {
		margin: 0;
		color: #0f3460;
	}

	.subtitle {
		margin: 0.25rem 0 0 0;
		color: #64748b;
		font-style: italic;
	}

	.info-group {
		margin-bottom: 1.25rem;
	}

	/* Remplacement des labels par des spantiers stylisés */
	.label {
		display: block;
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
		color: #94a3b8;
		margin-bottom: 0.25rem;
	}

	.affiliation-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.full-description {
		font-size: 0.95rem;
		line-height: 1.5;
		color: #334155;
		white-space: pre-line;
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.skill-card {
		background: #f8fafc;
		border-left: 4px solid #3b82f6; /* Couleur par défaut pour compétences actives */
		border-top: 1px solid #e2e8f0;
		border-right: 1px solid #e2e8f0;
		border-bottom: 1px solid #e2e8f0;
		border-radius: 4px;
		padding: 0.6rem 0.8rem;
	}

	/* Style spécifique pour les compétences passives */
	.skill-card.passive {
		border-left-color: #10b981;
		background-color: #f0fdf4;
	}

	.skill-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}

	.skill-type-badge {
		font-size: 0.7rem;
		text-transform: uppercase;
		font-weight: bold;
		padding: 0.1rem 0.4rem;
		border-radius: 3px;
		background: #e2e8f0;
		color: #475569;
	}

	.skill-cost {
		display: block;
		color: #64748b;
		font-weight: 600;
		margin-top: 0.2rem;
	}

	.skill-desc {
		font-size: 0.85rem;
		margin: 0.4rem 0 0 0;
		color: #334155;
	}
</style>