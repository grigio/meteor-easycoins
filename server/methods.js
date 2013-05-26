Meteor.methods({

  // BUG: lock me please, double spending
  pickUp: function(userId, pos) {
    var status = Tables.findOne({_id:'default'}).status;
    console.log('ST:'+status[pos].value);

    if (status[pos].value == 1) {
      status[pos].value = 0;
      Tables.update({_id:'default'}, { $set: {status:status} });
      console.log('STI:');
      setCoin(userId);
    }
  }

});