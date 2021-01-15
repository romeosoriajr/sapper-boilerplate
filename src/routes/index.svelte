<script>
import netlifyIdentity from 'netlify-identity-widget';
import { user, userDoc } from '../stores.js';

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

{#if $user}
	<p>User logged in</p>
	{#if $userDoc.pending}
		<p>Getting User Data</p>
	{:else}
		<p>{ JSON.stringify($userDoc.data) }</p>
	{/if}
	<button on:click={triggerLogout}>Trigger Logout Flow</button>
{:else}
	<p> User Not Logged In</p>
	<button on:click={triggerLogin}>Trigger Netlify Login</button>
{/if}
