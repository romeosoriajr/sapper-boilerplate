const sendQuery = require('./utils/send-query');

const GET_ALL_ENTRIES = `
	query {
		allEntries {
			data {
				_id
				weight
				tdee
				_ts
			}
		}
	}
`;

exports.handler = async() => {
	const { data, errors } = await sendQuery(GET_ALL_ENTRIES);

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors)
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ entries: data.allEntries.data })
	}
}
