const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})$/, 'Must be a valid email address'], //Validating email using Regex
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  toJSON: { virtuals: true },
  id: false,
});

//Function for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

//Creating monder for Mongoose
const User = model('User', userSchema);

module.exports = User;
