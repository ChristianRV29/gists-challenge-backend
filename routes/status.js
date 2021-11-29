const express = require('express');
const router = express.Router();

const { ENV } = process.env;

router.get('/', (req, res) => {
  res.status(200).send({
    status: 200, message: 'Server runnings ok!', env: ENV,
  });
});

module.exports = router;
