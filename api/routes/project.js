const express = require('express');
const auth = require('../middleware/auth');
const { createProject, getProject } = require('../controllers/projectController');


const router = express.Router();


router.post('/create',auth,createProject);
router.get('/:id',auth,getProject);

module.exports = router;