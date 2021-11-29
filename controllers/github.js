const axios = require('axios');

const authenticate = (req, res) => {
  try {
    const data = req.body;
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post('https://github.com/login/oauth/access_token', req.body, {
      headers,
    }).then((res) => {
      console.log('Funciono: ', JSON.stringify(res));
      return res.send({ success: true, message: 'Nice', data: res });
    }).catch((err) => {
      if (err.response) {
        // Request made and server responded
        console.log(JSON.stringify(err.response.data));
        console.log(JSON.stringify(err.response.status));
        console.log(JSON.stringify(err.response.headers));
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', JSON.stringify(err.message));
      }
      return res.status(401).send({ error: err, message: 'No quiere funcionar' });
    });
  } catch (err) {
    console.log('Catch error:', JSON.stringify(err.message));
    return res.send({ error: err, message: 'Ocurrío un error' });
  }
}

module.exports = { authenticate };