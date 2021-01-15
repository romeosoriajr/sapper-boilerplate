import axios from 'axios';
import { writable } from 'svelte/store';

function initUser() {
	const { subscribe, set } = writable({data: {}, pending: false})

	return {
		subscribe,
		get: async (user) => {
			var token = await user.jwt();
			set({data: {}, pending: true});
			let req = await axios({
				method: 'get',
				url:'/api/user',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			})
			if (req.status == '200') {
				const data = req.data;
				set({ data , pending: false });
			} else {
				set({data: {}, pending: false})
			}
		},
		reset: () => set({data: {}, pending: false})
	}
}
export const user = new writable(null);
export const userDoc = initUser();
