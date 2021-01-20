<script>
import netlifyIdentity from 'netlify-identity-widget';
import { user } from '../stores.js';

function triggerLogin() {
	netlifyIdentity.open();
};

function triggerLogout() {
	netlifyIdentity.logout();
};
</script>
<svelte:head>
	<title>Sapper Boilerplate</title>
</svelte:head>

<h1>Sapper Boilerplate</h1>

<p>Sapper boilerplate with Netlify Identity and Fauna</p>

{#if $user.pending}
	<p>Getting user state</p>
{:else}
	{#if $user.loggedIn }
		<p>{ JSON.stringify($user.data) }</p>
		<button on:click={triggerLogout}>Trigger Logout Flow</button>
	{:else}
		<p>User not logged in</p>
		<button on:click={triggerLogin}>Trigger Netlify Login</button>
	{/if}
{/if}
