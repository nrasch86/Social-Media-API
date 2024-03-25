const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const userData = [
  {
    _id: new mongoose.Types.ObjectId('6601df755c98aa0247cbb574'),
    username: 'user1',
    email: 'user1@example.com',
    friends: [], 
  },
  {
    _id: new mongoose.Types.ObjectId('6601df755c98aa0247cbb575'),
    username: 'user2',
    email: 'user2@example.com',
    friends: [], 
  },
  {
    _id: new mongoose.Types.ObjectId('6601f4e2b27f552b3e7cff46'), 
    username: 'user3',
    email: 'user3@example.com',
    friends: [], 
  },
 
  {
    _id: new mongoose.Types.ObjectId('6601f4e2b27f552b3e7cff47'), 
    username: 'user4',
    email: 'user4@example.com',
    friends: [], 
  },
];

const thoughtData = [
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "I'm user one. I wish I had more friends.",
    username: 'user1',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    thoughtText: "I'm user two. I'll be your friend.",
    username: 'user2',
  },
];

const reactionData = [
  {
    reactionBody: "That's a great thought, user one!",
    username: 'user2',
  },
  {
    reactionBody: "Thanks, user two! Looking forward to being friends.",
    username: 'user1',
  },
];

mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Add new seed users
  const seededUsers = await User.insertMany(userData);

  // Prepare user friendships
  const user1 = seededUsers.find(user => user.username === 'user1');
  const user2 = seededUsers.find(user => user.username === 'user2');
  user1.friends.push(user2._id);
  user2.friends.push(user1._id);
  await user1.save();
  await user2.save();

  // Add new seed thoughts with reactions
  for (let thought of thoughtData) {
    const user = seededUsers.find(user => user.username === thought.username);
    const newThought = await Thought.create({ ...thought, userId: user._id });
    
    // Add reactions to the thought
    for (let reaction of reactionData) {
      newThought.reactions.push({
        reactionBody: reaction.reactionBody,
        username: reaction.username,
      });
    }

    await newThought.save();
  }

  console.log('Database seeded!');
  process.exit(0);
});
