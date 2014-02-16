Customers = new Meteor.Collection("customers");
Suppliers = new Meteor.Collection("suppliers");

if (Meteor.isClient) {
    Template.topbar.events({
        'click a.home': function () {
            app.home();
        },
        'click a.customerlist': function () {
            app.customerlist();
        },
        'click a.supplierlist': function () {
            app.supplierlist();
        },
        'click a.about': function () {
            app.about();
        },
        'click a.contact': function () {
            app.contact();
        },
    });    
    
    Template.home.showHome = function() {
        return Session.get("operation") == 'showHome';
    }

    Template.customerlist.showCustomer = function() {
        return Session.get("operation") == 'showCustomer';
    }

    Template.customerlist.customers = function () {
        return Customers.find();
    };

    Template.customerlist.events({
        'click input.customernew': function () {
            app.customernew();
        },
        'click a.customerview': function () {
            app.customerview(this._id);
        },
    });    
    
    Template.customernew.showCustomerNew = function() {
        return Session.get("operation") == 'showCustomerNew';
    }

    Template.customernew.events = {
        'click input.customerlist': function () {
            app.customerlist();
        },
        'submit': function (e, tmpl) {
            // Don't postback
            e.preventDefault();
     
            // create the new customer
            var newCustomer = {
                name: tmpl.find("#name").value
            };
     
            // add the customer to the db
            Customers.insert(newCustomer);
            
            app.customerlist();
        }
    };

    Template.customerview.showCustomerView = function() {
        return Session.get("operation") == 'showCustomerView';
    }

    Template.customerview.customer = function () {
        var id = Session.get("customerId");
        
        if (id)
            return Customers.findOne({ _id: id });
    };

    Template.customerview.events({
        'click input.customerlist': function () {
            app.customerlist();
        },
    });    
    
    Template.supplierlist.showSupplier = function() {
        return Session.get("operation") == 'showSupplier';
    }
    
    Template.supplierlist.suppliers = function () {
        return Suppliers.find();
    };

    Template.supplierlist.events({
        'click input.suppliernew': function () {
            app.suppliernew();
        },
        'click a.supplierview': function () {
            app.supplierview(this._id);
        },
    });    
    
    Template.suppliernew.showSupplierNew = function() {
        return Session.get("operation") == 'showSupplierNew';
    };

    Template.suppliernew.events = {
        'click input.supplierlist': function () {
            app.supplierlist();
        },
        'submit': function (e, tmpl) {
            // Don't postback
            e.preventDefault();
     
            // create the new supplier
            var newSupplier = {
                name: tmpl.find("#name").value
            };
     
            // add the supplier to the db
            Suppliers.insert(newSupplier);
            
            app.supplierlist();
        }
    };
    
    Template.about.showAbout = function() {
        return Session.get("operation") == 'showAbout';
    };
    
    Template.contact.showContact = function() {
        return Session.get("operation") == 'showContact';
    };

    var Router = Backbone.Router.extend({
      routes: {
        "":                 "home",
        "customer":         "customerlist",
        "customer/new":      "customernew",
        "customer/:id":      "customerview",
        "supplier":         "supplierlist",
        "supplier/new":      "suppliernew",
        "supplier/:id":      "supplierview",
        "about":            "about",
        "contact":          "contact",
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
        Session.set("customerId", id);
        Session.set('operation', 'showCustomerView');
      },

      supplierlist: function() {
        Session.set('operation', 'showSupplier');
      },

      suppliernew: function() {
        Session.set('operation', 'showSupplierNew');
      },

      supplierview: function(id) {
        Session.set("supplierId", id);
        Session.set('operation', 'showSupplierView');
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
