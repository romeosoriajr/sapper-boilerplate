<script>
import Nav from '../components/Nav.svelte';
import { user, userDoc } from '../stores.js';
import netlifyIdentity from 'netlify-identity-widget';
import { onMount } from 'svelte';

let isLoading = true;

onMount(async () => {
	netlifyIdentity.on('login', async (u) => {
		if (!$user) {
				user.set({...u});
				userDoc.get(u);
		}
		netlifyIdentity.close();
	})

	netlifyIdentity.on('logout',() => {
			user.set(null);
			userDoc.reset();
		})

	netlifyIdentity.init();
	isLoading = false;
	})

export let segment;
	
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
