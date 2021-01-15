const sendMutation = require('./helpers/send-query');

const CREATE_USER = `
	mutation($ntlid: String!, $email: String!) {
		createUser(data: {email: $email, ntlid: $ntlid}) {
			email
    }
	}
`;

exports.handler = async (e, context) => {
	var { identity, user } = context.clientContext;
	if (!identity || !user) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'You must be logged in' })
		}
	}

	var inputData = {
		ntlid: user.sub,
		email: user.email
	}

	const { data, errors } = await sendMutation(CREATE_USER, inputData);

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors)
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ data })
	}
}
