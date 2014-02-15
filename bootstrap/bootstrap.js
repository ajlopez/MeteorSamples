if (Meteor.isClient) {
    Template.home.showHome = function() {
        return Session.get("operation") == 'showHome';
    }
    
    Template.about.showAbout = function() {
        return Session.get("operation") == 'showAbout';
    }
    
    Template.contact.showContact = function() {
        return Session.get("operation") == 'showContact';
    }

    var Router = Backbone.Router.extend({
      routes: {
        "":                 "home", //this will be http://your_domain/
        "about":            "about",  // http://your_domain/about
        "contact":          "contact"  // http://your_domain/contact
      },

      home: function() {
        Session.set('operation', 'showHome');
      },

      about: function() {
        Session.set('operation', 'showAbout');
      },

      contact: function() {
        Session.set('operation', 'showContact');
      }
    });
    
    var app = new Router;
    Meteor.startup(function () {
      Backbone.history.start({pushState: true});
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
