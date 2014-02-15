Customers = new Meteor.Collection("customers");
Suppliers = new Meteor.Collection("suppliers");

if (Meteor.isClient) {
    Template.home.showHome = function() {
        return Session.get("operation") == 'showHome';
    }

    Template.customerlist.showCustomer = function() {
        return Session.get("operation") == 'showCustomer';
    }
    
    Template.customerlist.customers = function () {
        return Customers.find();
    };

    Template.supplierlist.showSupplier = function() {
        return Session.get("operation") == 'showSupplier';
    }
    
    Template.supplierlist.suppliers = function () {
        return Suppliers.find();
    };
    
    Template.about.showAbout = function() {
        return Session.get("operation") == 'showAbout';
    }
    
    Template.contact.showContact = function() {
        return Session.get("operation") == 'showContact';
    }

    var Router = Backbone.Router.extend({
      routes: {
        "":                 "home", //this will be http://your_domain/
        "customer":         "customerlist",  // http://your_domain/about
        "supplier":         "supplierlist",  // http://your_domain/about
        "about":            "about",  // http://your_domain/about
        "contact":          "contact"  // http://your_domain/contact
      },

      home: function() {
        Session.set('operation', 'showHome');
      },

      customerlist: function() {
        Session.set('operation', 'showCustomer');
      },

      supplierlist: function() {
        Session.set('operation', 'showSupplier');
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
        if (Customers.find().count() === 0) {
            var names = ["Google",
                   "Microsoft",
                   "Apple"];

            for (var i = 0; i < names.length; i++)
                Customers.insert({ name: names[i] });
        }

        if (Suppliers.find().count() === 0) {
            var names = ["Amazon",
                   "Heroku",
                   "Docker"];

            for (var i = 0; i < names.length; i++)
                Suppliers.insert({ name: names[i] });
        }
    });
}
