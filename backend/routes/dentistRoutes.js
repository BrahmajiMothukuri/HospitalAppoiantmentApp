const express = require('express');
const { getDentists, createDentist } = require('../controllers/dentistController');

const router = express.Router();

router.get('/', getDentists);
router.post('/', createDentist);

module.exports = router;

