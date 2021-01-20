import axios from 'axios';
import { writable } from 'svelte/store';
import netlifyIdentity from 'netlify-identity-widget';

function initUser() {
	const { subscribe, set } = writable({loggedIn: false, data: {}, pending: false})

	return {
		subscribe,
		get: async (token) => {
			set({loggedIn: false, data: {}, pending: true});
			let req = await axios({
				method: 'get',
				url:'/api/user',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
			if (req.status == '200') {
				const { data } = req;
				set({ loggedIn: true, data, pending: false });
			} else {
				netlifyIdentity.logout();
				set({loggedIn: false, data: {}, pending: false});
				throw new Error('Could not get user document.');
			}
		},
		reset: () => set({loggedIn: false, data: {}, pending: false})
	}
}
export const user = initUser();
