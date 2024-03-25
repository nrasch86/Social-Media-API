const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Schema for new thoughts
const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') },
  username: { type: String, required: true },
  reactions: [reactionSchema],
}, {
  toJSON: { virtuals: true, getters: true },
  id: false,
});

// Schema for reactions to thoughts
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') },
  }, {
    toJSON: { getters: true },
    id: false,
});

//Function for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

//Creating model for Mongoose
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
