<script>
import netlifyIdentity from 'netlify-identity-widget';
	import { user } from '../stores.js';

function triggerLogin() {
	console.log('trigger login');
	netlifyIdentity.open();
};

function triggerLogout() {
	console.log('trigger logout');
	netlifyIdentity.logout();
};
</script>
<svelte:head>
	<title>Sapper Boilerplate</title>
</svelte:head>

<h1>Sapper Boilerplate</h1>

<p>Sapper boilerplate with Netlify Identity and Fauna</p>

{#if $user}
	<p> User logged in</p>
	<button on:click={triggerLogout}>Trigger Logout Flow</button>
{:else}
	<p> User Not Logged In</p>
	<button on:click={triggerLogin}>Trigger Netlify Login</button>
{/if}
