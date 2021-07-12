'use strict';

module.exports = function(excuse) {
excuse.total = function (cb) {
    var ds = excuse.dataSource;
    //
    // var total_sql = "SELECT id, excuse,excusedetails FROM  excuse ORDER BY id ";
  var total_sql = "SELECT excuse FROM  excuse ORDER BY id ";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })



  };

  excuse.remoteMethod('total', {
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/total',
      verb: 'get',
    },
  });

// Main Details
excuse.mainexcuse = function (data,cb) {
    var ds = excuse.dataSource;
    //
    var mainexcuse = "SELECT id, excusedetails FROM  excuse where TO_NUMBER(id) = '"+ data.id +"' ";
  var response = {};
    ds.connector.query(mainexcuse, [], function (err, accounts) {

        if (err) console.error(err);
        cb(err, accounts);
      })
};


  excuse.remoteMethod('mainexcuse', {
    accepts: {
      arg: 'data',
      type: 'object',
      http: {
        source: 'body',
      },

    },
    returns: {
      arg: 'result',
      type: 'array',
      root: true,
    },
    http: {
      path: '/mainexcuse',
      verb: 'get',
    },
  });


  // Sub Reason
  excuse.subexcuse = function (cb) {
    var ds = excuse.dataSource;
    //
    var subexcuse = "SELECT id, excusedetails FROM  excuse where id = "+data.id+" ";
    ds.connector.query(subexcuse, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })



  };

  excuse.remoteMethod('subexcuse', {
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/subexcuse',
      verb: 'get',
    },
  });


};
