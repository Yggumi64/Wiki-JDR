<script>
	import { enhance } from '$app/forms';
    let { form } = $props();
</script>

<div class="login-container">
	<h1>Connexion Wiki RPG</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="POST" use:enhance>
		<label for="identity">Nom d'utilisateur ou Email</label>
		<input type="text" id="identity" name="identity" required />

		<label for="password">Mot de passe</label>
		<input type="password" id="password" name="password" required />

		<button type="submit">Se connecter</button>
	</form>
</div>

<style>
	.login-container {
		max-width: 400px;
		margin: 4rem auto;
		padding: 2rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	button {
		padding: 0.75rem;
		background: #0f3460;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}
	.error {
		color: #e94560;
		font-weight: bold;
	}
</style>