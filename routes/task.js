const { Router } = require('express');
const router = Router();

const { createTask } = require('../controllers/task');

router.get('/:id', createTask);

module.exports = router;
