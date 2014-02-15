// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "mathematicians".

Mathematicians = new Meteor.Collection("mathematicians");

if (Meteor.isClient) {
  Template.maths.mathematicians = function () {
    return Mathematicians.find();
  };
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Mathematicians.find().count() === 0) {
      var names = ["David Hilbert",
                   "Henri Poincare",
                   "Leonard Euler",
                   "Carl Friedrich Gauss",
                   "George Cantor",
                   "Euclides"];
      for (var i = 0; i < names.length; i++)
        Mathematicians.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
