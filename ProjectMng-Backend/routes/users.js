const express = require('express');
const bcrypt = require('bcrypt');
const { User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const {generateToken} = require('../utils.js');

router.post(
  '/signin', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  }
);

router.post(
  '/register', async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  }
);


router.get(
  '/:id', auth, async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  }
);


module.exports = router;
