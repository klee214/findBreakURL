const axios = require('axios');

const axiosFetch = async (url) => {
    const response = await axios.get(url);
    return response.status;
};

module.exports = { axiosFetch };
