//------------------------------------------------------------------------------
//-- Imports
const { User } = require('../models');

const userController = {
    // /api/users/
    getAllUsers(req, res) {
        User.find({})
        .then(allUsersData => res.json(allUsersData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/users/:id
    getUserById( { params }, res ) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(allUsersData => res.json(allUsersData))
        .catch(err => res.sendStatus(400).json(err));
    },
    // /api/users/
    createUser({ body }, res) {
        User.create(body)
        .then(allUsersData => res.json(allUsersData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/users/:id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(allUsersData => res.json(allUsersData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/users/:id
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(allUsersData => res.json(allUsersData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/users/:userId/friend/:friendId
    createFriendById({ params }, res) {
        User.findOneAndUpdate(
            {   _id: params.userId                         },
            {   $addToSet: { friends: params.friendId }    },
            {   runValidators: true, new: true             }
        )
            .then(friendAddedResponse => {
                //-- if no user associted, exit.
                if (!friendAddedResponse) {return res.status(400).json({"message":`ERROR: No User associated to ID: ${params.userId}`});};
                res.status(200).json(friendAddedResponse)
            })
            .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/users/:userId/friend/:friendId
    deleteFriendById({ params }, res) {
        User.findOneAndUpdate(
            {   _id: params.userId                           },
            {   $pull: { friends: params.friendId }          },
            {   runValidators: true, new: true               }
        )
            .then(friendAddedResponse => {
                //-- if no user associted, exit.
                if (!friendAddedResponse) {return res.status(400).json({"message":`ERROR: No User associated to ID: ${params.userId}`});};
                
                res.json(friendAddedResponse);
            })
            .catch(err => {console.log(err); res.sendStatus(400)});
    },
};

//------------------------------------------------------------------------------
//-- Exports
module.exports = userController;
