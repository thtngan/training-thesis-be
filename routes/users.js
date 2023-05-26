var express = require('express');
var router = express.Router();
bodyParser = require('body-parser').json();

var userController = require('../controllers/userController');

/* GET list  */
router.route('/list').get(userController.getAll)
router.route('/:id').get(userController.getUserByUsername)
router.route('/login').post(userController.authenticateUser)

/* CREATE user */
router.route('/add').post(userController.createUser)

/* UPDATE user */
router.route('/update/:id').put(userController.updateUserByUsername)

module.exports = router;
