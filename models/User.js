const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
          type: String,
          trim: true,
          unique: true,
          required: 'ERROR: Username is required',
        },
        email: {
          type: String,
          unique: true,
          required: 'ERROR: Email is required',
          match: [/.+@.+\..+/, 'ERROR: Please enter a valid email address']
        },
        password: {
          type: String,
          trim: true,
          required: 'ERROR: Password is required',
          validate: [({ length }) => length >= 6, 'ERROR: Password must be at least 6 characters']
        },
        date_created: {
          type: Date,
          default: Date.now,
          get: date_creted_value => dateFormat(date_creted_value)
        },
        // date_login: {
        //   type: Date,
        //   default: Date.now
        // },
        //-- related to other schemas
        thoughts: [{
          type: Schema.Types.ObjectId, 
          ref: 'Thought'
        }],
        friends: [{
          type: Schema.Types.ObjectId, 
          ref: 'User'
        }]
      },
      {
        toJSON: {
          virtuals: true,
        },
        id: false
      }
);

//-- virtual getting total friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce((total, friend) => total + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;
