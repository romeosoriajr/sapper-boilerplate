const sendMutation = require('./helpers/send-query');

const CREATE_USER = `
	mutation($ntlid: String!, $email: String!) {
		createUser(data: {email: $email, ntlid: $ntlid}) {
			email
    }
	}
`;

exports.handler = async (e) => {
	const payload = JSON.parse(e.body);
	const { user } = payload;

	var inputData = {
		ntlid: user.id,
		email: user.email
	}

	const { errors } = await sendMutation(CREATE_USER, inputData);

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors)
		}
	}

	return {
		statusCode: 200,
		body: '{}'
	}
}
