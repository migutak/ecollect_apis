'use strict';

module.exports = function(tblportfoliostatic) {
  tblportfoliostatic.actiondate = function (inbody, cb) {
    var ds = tblportfoliostatic.dataSource;
    var total = inbody.length;
    var last = total-1;
    for (var i = 0; i < total; i++) {
      if(i==last){
        addLast(inbody[i]);
      } else {
        add(inbody[i]);
      }
    }

    function add(data) {
      var msql = 'update tbl_portfolio_static set actiondate = sysdate where accnumber = \'' + data.accnumber + '\'';
      console.log(msql)
      ds.connector.query(msql, [], function (err, result) {
        if (err) console.error(err);
        // console.log('result', data.accnumber, result)
        //cb(err, null);
      })
    }

    function addLast(data) {
      var msql = 'update tbl_portfolio_static set actiondate = sysdate where accnumber = \'' + data.accnumber + '\'';

      ds.connector.query(msql, [], function (err, result) {
        if (err) console.error(err);
        cb(err, result);
      })
    }
  };

  tblportfoliostatic.remoteMethod('actiondate', {
    accepts: {
      arg: 'inbody',
      type: 'array',
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
      path: '/actiondate',
      verb: 'post',
    },
  });
};
