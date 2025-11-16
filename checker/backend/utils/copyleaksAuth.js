const axios = require("axios");

async function getAccessToken() {
  const email = process.env.COPYLEAKS_EMAIL;
  const key = process.env.COPYLEAKS_API_KEY;

  const response = await axios.post(
    "https://id.copyleaks.com/v3/account/login/api",
    {
      email,
      key
    }
  );

  return response.data.access_token;
}

module.exports = getAccessToken;
