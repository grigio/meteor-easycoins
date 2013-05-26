// usersList

Template.usersList.users = function () {
  return Users.find({}, {sort: {clicks: -1}});
};

Handlebars.registerHelper("highlight", function(val) {
  if (val === Meteor.default_connection._lastSessionId){
    return "background-color: yellow;";
  } else {
    return "";
  }
});