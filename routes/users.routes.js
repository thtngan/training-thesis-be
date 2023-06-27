var express = require('express');
var router = express.Router();
bodyParser = require('body-parser').json();
var cors = require('cors')

var userController = require('../controllers/userController');

var corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200
  };

/* GET list  */
router.route('/list').get(userController.getAll)
router.route('/:id').get(userController.getUserByUsername)
router.route('/login').post(userController.authenticateUser)

/* CREATE user */
router.route('/signup').post(cors(corsOptions), userController.createUser)

/* UPDATE user */
router.route('/update/:id').put(userController.updateUserByUsername)

module.exports = router;
