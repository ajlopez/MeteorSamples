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

    Template.customernew.showCustomerNew = function() {
        return Session.get("operation") == 'showCustomerNew';
    }

    Template.customernew.events = {
        'submit': function (e, tmpl) {
            // Don't postback
            e.preventDefault();
     
            // create the new customer
            var newCustomer = {
                name: tmpl.find("#name").value
            };
     
            // add the movie to the db
            Customers.insert(newCustomer);
            
            app.customerlist();
        }
    };

    Template.customerview.showCustomerView = function() {
        return Session.get("operation") == 'showCustomerView';
    }
    
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
        "":                 "home",
        "customer":         "customerlist",
        "customer/new":      "customernew",
        "customer/:id":      "customerview",
        "supplier":         "supplierlist",
        "about":            "about",
        "contact":          "contact"
      },

      home: function() {
        Session.set('operation', 'showHome');
      },

      customerlist: function() {
        Session.set('operation', 'showCustomer');
      },

      customernew: function() {
        Session.set('operation', 'showCustomerNew');
      },

      customerview: function(id) {
        //Template.customerview.item = { _id: 1, name: 'Customer 1' };
        console.log('view', id);
        var item = Customers.find({ _id: id }, { limit: 1, reactive: false}).fetch()[0];
        console.log('item', item);
        Template.customerview.item = item;
        Session.set('operation', 'showCustomerView');
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
