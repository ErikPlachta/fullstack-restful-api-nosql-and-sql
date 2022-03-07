//------------------------------------------------------------------------------
//-- Imports
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    createFriendById,
    deleteFriendById
} = require('../../controllers/user-controller');
  
// /api/user
router.route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/user/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// /api/user/:userId/friend/:friendId
router.route('/:userId/friends/:friendId')
    .post(createFriendById)
    .delete(deleteFriendById)


//------------------------------------------------------------------------------
//-- Exports
module.exports = router;
