const sendMutation = require('./helpers/send-query');

const CREATE_USER = `
	mutation($netlify: String!, $email: String!) {
		createUser(data: {email: $email, netlify: $netlify}) {
			email
    }
	}
`;

exports.handler = async (e) => {
	const payload = JSON.parse(e.body);
	const user = payload.user;

	var inputData = {
		netlify: 'netlify-blah',
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
