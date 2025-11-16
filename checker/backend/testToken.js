const axios = require("axios");

async function testToken() {
  try {
    const res = await axios.post(
      "https://id.copyleaks.com/v3/account/login/api",
      {
        email: "rsharmila088@gmail.com",
        key: "c6b546c1-b11b-4f07-931a-1bdcdc2f0e80"
      }
    );

    console.log("✅ TOKEN:", res.data.access_token);
  } catch (e) {
    console.log("❌ TOKEN ERROR:", e.response?.data || e.message);
  }
}

testToken();
