// this function is invoked at /api/req-sample
exports.handler = (event, context) => {

	// To utilize Netlify Identity, pass JWT in headers
	// to this endpoint
	const { identity, user } = context.clientContext;

	const data = {
		identity,
		user,
		key: "value"
	}

	return {
		statusCode: 200,
		body: JSON.stringify( { data })
	}
}
