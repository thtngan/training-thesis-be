var User = require('../models/user.models')
const bcrypt = require('bcrypt');

// List all users
exports.getAll = (req, res) => {
    User.find()
        .then((users) => {
            return res.status(200).json({
                success: true,
                message: 'List all users',
                users: users
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again',
                error: err.message
            })
        })
}

// Create user
exports.createUser = (req, res) => {
    const { username, email, password, tracking } = req.body;

    // Check if the email already exists in the database
    User.findOne({ $or: [{ email }] })
        .then((existingUser) => {
        if (existingUser) {
            return res.status(409).json({
            success: false,
            message: 'Email already exists',
            });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
            tracking,
        });

        newUser.save()
            .then((user) => {
            console.log(user);
            return res.status(200).json({
                success: true,
                message: 'User created successfully',
                user,
            });
            })
            .catch((err) => {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again',
                error: err.message,
            });
            });
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again',
        error: err.message,
      });
    });
};
  
// Authenticate user
exports.authenticateUser = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
  
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: 'Server error. Please try again',
              error: err.message,
            });
          }
  
          if (isMatch) {
            // Passwords match, proceed with authentication logic
            // ...
            return res.status(200).json({
              success: true,
              message: 'Authentication successful',
              user,
            });
          } else {
            // Passwords do not match
            return res.status(401).json({
              success: false,
              message: 'Authentication failed',
            });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Server error. Please try again',
          error: err.message,
        });
      });
};
