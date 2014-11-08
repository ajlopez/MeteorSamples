lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {
  Template.categories.lists = function () {
    return lists.find({}, {sort: {Category: 1}});
  };
  // We are declaring the 'adding_category' flag
  Session.set('adding_category', false);
  
    // This returns true if adding_category has been assigned a value
    //of true
    Template.categories.new_cat = function () {
        return Session.equals('adding_category',true);
    };  

    Template.categories.events({
        'click #btnNewCat': function (e, t) {
            Session.set('adding_category', true);
            Meteor.flush();
            focusText(t.find("#add-category"));
        },
        'keyup #add-category': function (e,t){
            if (e.which === 13)
            {
                var catVal = String(e.target.value || "");
                if (catVal)
                {
                    lists.insert({Category:catVal});
                    Session.set('adding_category', false);
                }
            }
        }    
    });

    /////Generic Helper Functions/////
    //this function puts our cursor where it needs to be.
    function focusText(i) {
        i.focus();
        i.select();
    };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
