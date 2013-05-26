// gameTable

Template.gameTable.table = function () {
  return Tables.find({_id: 'default'}); // TODO: nil manage
  // Tables.findOne({_id: 'default'}).status;
};

Template.gameTable.cells = function () {
  if ((typeof Tables == 'object') && Tables.findOne())
    return Tables.findOne({_id: 'default'}).status;
  else
    return []
};

Template.gameTable.events({
  'click span.coin' : function (e,t) {
    // template data, if any, is available in 'this'
    var pos = e.target.id;
    $('#'+pos).hide(); // HACK: quick hide
    pickUp( pos );
    console.log("You pressed the button " + pos);

  }
});

pickUp = function (pos) {
  console.log('piccked '+ pos);
  Meteor.call('pickUp', Meteor.default_connection._lastSessionId, pos)
}

Handlebars.registerHelper("coin", function(val) {
  if (val !== 0){
    return "฿";
  } else {
    return "";
  }
});

Handlebars.registerHelper("display", function(val) {
  if (val !== 0){
    return "block";
  } else {
    return "none";
  }
});