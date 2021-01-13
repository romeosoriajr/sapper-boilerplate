<script>
import Nav from '../components/Nav.svelte';
import { user } from '../stores.js';
import netlifyIdentity from 'netlify-identity-widget';
import { onMount } from 'svelte';

let isLoading = true;

onMount(() => {
		netlifyIdentity.on('login', async (u) => {
			if ($user) {
				user.set(u);
			}

			netlifyIdentity.close();
		})
	
		netlifyIdentity.init();
		netlifyIdentity.on('logout',() => {
				user.set(null);
			})

		isLoading = false;
	})

export let segment;

	
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
