'use strict';

module.exports = function(memos) {
    memos.all = function (cb) {
        var ds = memos.dataSource;
        //
        var total_sql = "Select * from memos";
        ds.connector.query(total_sql, [], function (err, data) {
          if (err) console.error(err);
          cb(err, data);
        })
    
      };
    
      memos.remoteMethod('all', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/all',
          verb: 'get',
        },
      });
};
