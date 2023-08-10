const { User, Message, Day } = require("../models");
const { AuthenticationError } = require("graphql-tag");
const { signToken } = require("../utils/auth");
const { PubSub } =  require('graphql-subscriptions');
const pubsub = new PubSub();

// Resolvers Function Start//
const resolvers = {
  Query: {
    ///Connects to me query in typeDef//
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password");
        // .populate('friends');
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    //Gets All Users//
    users: async () => {
      return User.find().select("-__v -password");
      // .populate('friends');
    },
    //Gets Single User//
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password");
      // .populate('thoughts');
    },
    days: async () => {
      return Day.find()
      // .populate('friends');
    },
    blackoutDays: async () => {
      return Day.find({disabled: true})
    },
    day: async (parent, { date }) => {
      console.log('the date: ', date)
      return Day.findOne({ date })
    },
  },
  /// --- Mutation Start --- ///
  Mutation: {
    //Creates New User//
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, args, context) => {
      // const user = await User.create(args);
      // const token = signToken(user);
      // return { token, user };
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          args,
          { new: true }
        )
        const token = signToken(user);
        return { token, user };
      }
      //Error if not logged in//
      throw new AuthenticationError('You need to be logged in!');
    },
    //Mutation for login//
    login: async (parent, { email, password }) => {
      /// ---- Const searches for email ---///
      const user = await User.findOne({ email });
      /// ---- if email not found it throws error ---///
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      /// ---- Const searches for correct password ---///
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, args, context) => {
      // const user = await User.create(args);
      // const token = signToken(user);
      // return { token, user };
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          args,
          { new: true }
        )
        const token = signToken(user);
        return { token, user };
      }
      //Error if not logged in//
      throw new AuthenticationError('You need to be logged in!');
    },
    addDay: async (parent, args, context) => {
      const checkDate = await Day.findOne(
        { date: args.date }
      )
      if (!checkDate) {
        console.log('date doesnt exist: ', checkDate)
         const date = await Day.create(args);
        return date;
      } else {
        // console.log('date already exists: ', checkDate)
        throw new Error('date already exists: ', checkDate)
      }
      // const date = await Day.create(args);
      // return date;
    },
    editDay: async (parent, args, context) => {
      console.log('editDay args: ', args)
      if (context.user) {
        const date = await Day.findOneAndUpdate(
          { date: args.date },
          { $set: { disabled: args.disabled, hours: args.hours } },
          { new: true }
        )           
        return date;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    postMessage: async (parent, {username, text, recipient}, context) => {
      if (context.user) {
        const message = await Message.create({ username: username, text: text, recipient: recipient });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { messages: message } },
          { new: true }
        );
        pubsub.publish('MESSAGE_POSTED', { postCreated: message }); 
        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },  
  },
  Subscription: {
    messagePosted: {
      resolve: (payload) => payload.postCreated,
      subscribe: () => pubsub.asyncIterator('MESSAGE_POSTED'),
    },
  },
};
/// ---- Resolvers Function End ---- ////

module.exports = resolvers;
