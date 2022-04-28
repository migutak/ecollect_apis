'use strict';

module.exports = function(tbl_emailsent) {

  // UPDATE TRASH

  tbl_emailsent.updatedeltrash = function(data, cb) {
    var ds = tbl_emailsent.dataSource;
    //
    var update_sql = "update tbl_emailsent set trash = 'Yes' where id =   '" + data.id + "' ";
    ds.connector.query(update_sql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });

  };

  tbl_emailsent.remoteMethod('updatedeltrash', {
    accepts: {
      arg: 'data',
      type: 'object',
      http: {
        source: 'body',
      },
    },
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/updatedeltrash',
      verb: 'post',
    },
  });





  //restore trash
  tbl_emailsent.restoretrash = function(data, cb) {
    var ds = tbl_emailsent.dataSource;
    //
    var update_sql = "update tbl_emailsent set trash = 'no' where id =   '" + data.id + "' ";
    ds.connector.query(update_sql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });

  };

  tbl_emailsent.remoteMethod('restoretrash', {
    accepts: {
      arg: 'data',
      type: 'object',
      http: {
        source: 'body',
      },
    },
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/restoretrash',
      verb: 'post',
    },
  });
};
