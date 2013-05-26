
updateToken = function() {
  if (typeof Tables !== 'undefined')
    token = Tables.findOne('default').token;
  
  console.log('try update token');
};


Meteor.startup(function() {
    $(function() {
        FastClick.attach(document.body);
    });

  // HACK: vars not ready
  setTimeout(function() {
    // updateToken();
    if ((typeof Tables !== 'undefined') && Tables.findOne) {
      Session.set('tableStatus', Tables.findOne().status );
      Session.set('tableToken', Tables.findOne().token );
      console.log('autorun tknstp');
    }
  }, 1000);


});

// Subscribe
Meteor.autorun(function() {
  
  Meteor.subscribe('users' );
  Meteor.subscribe('tables','default' ); // default is the game id

  if ((typeof Tables !== 'undefined') && Tables.findOne) {
    Session.set('tableStatus', Tables.findOne().status );
    Session.set('tableToken', Tables.findOne().token );
    console.log('autorun tkn');
  }
  console.log('autorun');
});


