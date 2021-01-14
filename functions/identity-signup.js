const sendMutation = require('./helpers/send-query');

const CREATE_USER = `
	mutation($netlify: String!, $email: String!) {
		createUser(data: {email: $email, netlify: $netlify}) {
			email
    }
	}
`;

exports.handler = async (e) => {

	var inputData = {
		netlify: e.event,
		email: 'blahblah@blah.com'
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
