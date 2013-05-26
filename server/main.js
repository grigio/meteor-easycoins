initData = function () {
  Tables.remove({});
  Tables.insert({_id:'default',
                  token: 'first', status:[ {pos: 0,  value: 1},
                                           {pos: 1,  value: 0},
                                           {pos: 2,  value: 0},
                                           {pos: 3,  value: 0},
                                           {pos: 4,  value: 0},
                                           {pos: 5,  value: 0},
                                           {pos: 6,  value: 0},
                                           {pos: 7,  value: 0},
                                           {pos: 8,  value: 0},
                                           {pos: 9,  value: 0},
                                           {pos: 10, value: 1},
                                           {pos: 11, value: 0},
                                           {pos: 12, value: 0},
                                           {pos: 13, value: 0},
                                           {pos: 14, value: 0},
                                           {pos: 15, value: 0},
                                           {pos: 16, value: 1},
                                           {pos: 17, value: 0},
                                           {pos: 18, value: 0},
                                           {pos: 19, value: 0},
                                           {pos: 20, value: 0},
                                           {pos: 21, value: 0},
                                           {pos: 22, value: 0},
                                           {pos: 23, value: 0},
                                           {pos: 24, value: 0} ]});
}

setCoin = function(sid) {
  Users.update({_id:sid },
    {$inc:{ clicks: 1 }
  });
  console.log('new coin for '+sid);
}

usersManager = function () {
// Online checks
// via: https://github.com/murilopolese/howmanypeoplearelooking
  Users.remove({});
  Meteor.default_server.stream_server.register( Meteor.bindEnvironment( function(socket) {
    var intervalID = Meteor.setInterval(function() {
      if (socket.meteor_session) {

        var connection = {
            _id: socket.meteor_session.id,
            username: "guest"+_.random(10,99),
            clicks: 0
        };

        console.log(">> add "+socket.meteor_session.id)
        socket.id = socket.meteor_session.id;
          Users.insert(connection); 
        Meteor.clearInterval(intervalID);
      }
    }, 1000);

    socket.on('close', Meteor.bindEnvironment(function () {
      console.log(">> remove "+socket.id)
        Users.remove({
        _id: socket.id
      });
    }, function(e) {
        Meteor._debug("Exception from connection close callback:", e);
    }));
  }, function(e) {
      Meteor._debug("Exception from connection registration callback:", e);
  }));
};


// The main
Meteor.startup(function () {

  initData();     // migrates the initial table status
  usersManager(); // it manages users connections/disconnections

  // NOTE: it uses fibers setTinterval 
  Meteor.setInterval(function () {
    var status = Tables.findOne({_id:'default'}).status;
    var sum = _.reduce( status , function(memo, obj){ return memo + obj.value; }, 0);
    // console.log('ST:'+status[pos].value);

    // there's no coin I'll add one
    if (sum == 0) {
      var pos = _.random(0,24);
      status[pos].value = 1;
      Tables.update({_id:'default'}, { $set: {status:status} });
      console.log('generated new coin');
    }
  },5000);

  console.info('Server ready');
});



