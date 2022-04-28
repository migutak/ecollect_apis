'use strict';

module.exports = function(utilizationbranch) {
  utilizationbranch.regiontotal = function(region, cb) {
    var ds = utilizationbranch.dataSource;
    //
    const total_sql = "SELECT region,COUNT(accnumber)total FROM tqall where daysinarr <= 360 and daysinarr > 0 and REGION = '" + region + "' group BY region";
    ds.connector.query(total_sql, [], function(err, accounts) {
      if (err) console.error(err);
      console.log(total_sql);
      cb(err, accounts);
    });
  };

  utilizationbranch.remoteMethod('regiontotal', {
    accepts: {
      arg: 'region',
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
      path: '/regiontotal',
      verb: 'get',
    },
  });
};
