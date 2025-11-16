const axios = require("axios");

async function loginToCopyleaks() {
  const res = await axios.post("https://id.copyleaks.com/v3/account/login/api", {
    email: process.env.COPYLEAKS_EMAIL,
    key: process.env.COPYLEAKS_API_KEY
  });

  return res.data.access_token;
}

module.exports = { loginToCopyleaks };
