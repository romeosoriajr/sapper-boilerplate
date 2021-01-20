<script>
import { user } from '../stores.js';
import Nav from '../components/Nav.svelte';
import netlifyIdentity from 'netlify-identity-widget';
import { onMount } from 'svelte';

onMount(async () => {
	netlifyIdentity.on('login', async (u) => {
		try {
			const token = await u.jwt();
			await user.get(token);
		} catch(error) {
			console.error(error);
		}
		netlifyIdentity.close();
	})

	netlifyIdentity.on('logout',() => {
		user.reset();
	})
	netlifyIdentity.init();
});

export let segment;
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
