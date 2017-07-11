import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Rooms = new Meteor.Collection('rooms');
Rooms.attachSchema(new SimpleSchema({
  'players': {
    type: Array,
  },
  'players.$': {
    type: Object
  },
  'players.$._id': {
    type: String
  },
  'players.$.username': {
    type: String
  },
  'players.$.score': {
    type: String
  },
  'players.$.solutions': {
    type: Array
  },
  'players.$.solutions.$': {
    type: String
  },
  'players.$.connected': {
    type: Boolean
  },

  'table': {
    type: Array
  },
  'table.$': {
    type: Array
  },
  'table.$.$': {
    type: String,
    min: 1,
    max: 1
  },

  'solutions': {
    type: Array,
  },
  'solutions.$': {
    type: Object
  },
  'solutions.$.word': {
    type: String
  },
  'solutions.$.guessed': {
    type: Boolean
  }
}));

if (Meteor.isServer) {
  Meteor.publish('my.rooms', function() {

  });
}
