'use strict';

module.exports = function(Uploads) {

  Uploads.getuploads = function (custnumber, newcustnumber, cb) {
    var ds = Uploads.dataSource;
    //
    var total_sql = "Select * from UPLOADS where custnumber = '" + custnumber +"' or newcustnumber = '" + newcustnumber +"'";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  Uploads.remoteMethod('getuploads', {
    accepts: [{
      arg: 'custnumber',
      type: 'string',
      http: {
        source: 'query',
      },
    },
      {
        arg: 'newcustnumber',
        type: 'string',
        http: {
          source: 'query',
        },
      }],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/getuploads',
      verb: 'get',
    },
  });

};
