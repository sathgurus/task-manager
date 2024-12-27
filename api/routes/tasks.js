const express = require('express');
const {
  addTask,
  getTasks,
  deleteTask,
  completeTask,
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth, addTask);
router.get('/:status', auth, getTasks);
router.delete('/delete/:id', auth, deleteTask);
router.put('/edit/:id', auth, completeTask);

module.exports = router;
