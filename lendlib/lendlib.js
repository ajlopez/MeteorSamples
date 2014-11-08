lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {
  Template.categories.lists = function () {
    return lists.find({}, {sort: {Category: 1}});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
