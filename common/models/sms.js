'use strict';

module.exports = function(Sms) {
  Sms.total = function(custnumber, cb) {
    const ds = Sms.dataSource;
    //
    var totalsql = "SELECT * FROM SMS WHERE custnumber = '" + custnumber + "'";

    ds.connector.query(totalsql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Sms.remoteMethod('totalsms', {
    accepts: {
      arg: 'custnumber',
      type: 'string',
      http: {
        source: 'query',
      },
    },
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/totalsms',
      verb: 'get',
    },
  });
};
