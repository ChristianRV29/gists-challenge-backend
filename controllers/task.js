const createTask = (req, res) => {
  const { id } = req.params;

  if (id && id.length > 0) {
    return res.send({ message: `Nice job Christian, your id is: ${id}` });
  } else {
    return res.send({ message: 'Missing \'Id\' in the request' });
  }
};

module.exports = { createTask };
