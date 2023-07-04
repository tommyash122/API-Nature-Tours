const {
  addUser,
  deleteUser,
  getUser,
  gettAllUsers,
  updateUser,
} = require('./../controllers/userController');
const express = require('express');

const router = express.Router();

router.route('/').get(gettAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
