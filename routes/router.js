// importing dependencies
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// importing controllers
const { registerController } = require('../controllers/registerController');
const { loginController } = require('../controllers/loginController');
const { createTodoController } = require('../controllers/createTodoController')
const { getTodoController } = require('../controllers/getTodoController');
const { isDoneController } = require('../controllers/isDoneController');
const { deleteTodoController } = require('../controllers/deleteTodoController');
const { logoutController } = require('../controllers/logoutController');


router.post('/register', registerController);
router.post('/login', loginController);
router.post('/create-todo', authenticate, createTodoController);
router.get('/get-todo', authenticate, getTodoController);
router.post('/mark-todo', authenticate, isDoneController);
router.delete('/delete-todo', authenticate, deleteTodoController);
router.post('/logout', authenticate, logoutController);


module.exports = router;