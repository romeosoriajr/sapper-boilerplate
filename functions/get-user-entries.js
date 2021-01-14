const sendQuery = require('./helpers/send-query');

const createQueryString = (netlify) => {
	return `query {
    getUser(netlify: "${netlify}") {
      data {
        email
      }
    }
  }`;
}

exports.handler = async(_, context) => {
  const { identity, user } = context.clientContext;

  if (!identity) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Identity missing"})
    }
  }

  if (!user) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: "User missing"})
    }
  }

  try {
    const { data, errors } = await sendQuery(createQueryString(user.sub));

    if (errors) {

      return {
        statusCode: 500,
        body: JSON.stringify(errors)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.getUser)
    }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      }
    }
}
