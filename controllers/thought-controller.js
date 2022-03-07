//------------------------------------------------------------------------------
//-- Imports
const { Thought, User } = require('../models');

const thoughtController = {
    // /api/thoughts/
    getAllThoughts(req, res) {
        Thought.find({})
        .then(allThoughtsData => res.json(allThoughtsData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/thoughts/:id
    getThoughtById( { params }, res ) {
        Thought.findOne({ _id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(allThoughtsData => res.json(allThoughtsData))
        .catch(err => res.sendStatus(400).json(err));
    },
    // /api/thoughts/
    createThought({ body }, res) {
        Thought.create(body)
        //--Attach thought to user
        .then(allThoughtsData => {
            
            User.findOneAndUpdate(
                {   _id: body.userId                        },
                {   $addToSet: { thoughts: allThoughtsData }    },
                {   runValidators: true, new: true          }
            )
            .then(thoughtAddedResponse => {
                //-- if no user associted, exit.
                if (!thoughtAddedResponse) { console.log({"message":`ERROR: No User associated to ID: ${body.userId}`});};
            })
        
            res.json(allThoughtsData)
        })
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/thoughts/:id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(allThoughtsData => res.json(allThoughtsData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/thoughts/:id
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(allThoughtsData => res.json(allThoughtsData))
        .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/thoughts/:thoughtId/reactions
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {   _id: params.thoughtId                 },
            {   $push: { reactions: body }    },
            {   runValidators: true, new: true        }
        )
            .then(reactionAddedResponse => {
                //-- if no user associted, exit.
                if (!reactionAddedResponse) {return res.status(400).json({"message":`ERROR: No Thought associated to ID: ${params.thoughtId}`});};
                res.status(200).json(reactionAddedResponse)
            })
            .catch(err => {console.log(err); res.sendStatus(400)});
    },
    // /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReactionById({ params }, res) {
        Thought.findOneAndUpdate(
            {   _id: params.thoughtId                                   },
            {   $pull: { reactions: { reactionId: params.reactionId } } },
            {   runValidators: true, new: true                          }
        )
            .then(reactionAddedResponse => {
                //-- if no user associted, exit.
                if (!reactionAddedResponse) {return res.status(400).json({"message":`ERROR: No Thought associated to ID: ${params.thoughtId}`});};
                
                res.json(reactionAddedResponse);
            })
            .catch(err => {console.log(err); res.sendStatus(400)});
    },
};

//------------------------------------------------------------------------------
//-- Exports
module.exports = thoughtController;