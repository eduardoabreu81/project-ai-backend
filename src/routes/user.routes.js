const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

router.use(verifyToken);
router.get('/', user.findAll);
router.get('/:id', user.findOne);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;