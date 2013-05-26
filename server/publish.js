Meteor.publish("users", function(){
  return Users.find({}); // TODO: remove connID
});

// NOTE: currently we use just one table
Meteor.publish("tables", function(id){
  return Tables.find({_id:id});
});