'use strict';

module.exports = function(Guarantordetails) {
    Guarantordetails.total = function (custnumber, cb) {
        var ds = Guarantordetails.dataSource;
        //
        var total_sql = "Select count(*) total from Guarantordetails where custnumber = '" + custnumber +"'";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    Guarantordetails.remoteMethod('total', {
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
            path: '/total',
            verb: 'get',
        },
    });





  Guarantordetails.getg = function (custnumber, newcustnumber, cb) {
    var ds = Guarantordetails.dataSource;
    //
    var total_sql = "Select * from Guarantordetails where custnumber = '" + custnumber +"' or newcustnumber = '" + newcustnumber +"'";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  Guarantordetails.remoteMethod('getg', {
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
      path: '/getg',
      verb: 'get',
    },
  });
};
