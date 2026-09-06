<script>
	import { enhance } from '$app/forms';
	let { data, children} = $props();
</script>

<div class="app-layout">
	<nav class="top-nav">
		<div class="links">
			<a href="/">Accueil</a>
			<a href="/factions">Factions</a>
			<a href="/personnages">Personnages</a>
		</div>

		<div class="auth-zone">
			{#if data.user}
				<span>Bonjour, <strong>{data.user.username || data.user.email}</strong></span>
				<form method="POST" action="/logout" use:enhance>
					<button type="submit" class="logout-btn">Déconnexion</button>
				</form>
			{:else}
				<a href="/login" class="login-btn">Se connecter</a>
			{/if}
		</div>
	</nav>

	<main id="content">
		{@render children()}
	</main>
</div>

<style>
	.top-nav {
		background-color: #16213e;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.links {
		display: flex;
		gap: 15px;
	}
	.links a, .login-btn {
		color: #ccd6f6;
		text-decoration: none;
		font-weight: bold;
	}
	.auth-zone {
		display: flex;
		align-items: center;
		gap: 15px;
		color: white;
	}
	.logout-btn {
		background: #e94560;
		color: white;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}
</style>