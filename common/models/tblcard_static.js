'use strict';

module.exports = function (tblcard_static) {
  tblcard_static.actiondate = function (inbody, cb) {
    var ds = tblcard_static.dataSource;
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
      var msql = 'update TBLCARD_STATIC set actiondate = sysdate where cardacct = \'' + data.accnumber + '\'';
      console.log(msql)
      ds.connector.query(msql, [], function (err, result) {
        if (err) console.error(err);
        // console.log('result', data.accnumber, result)
        //cb(err, null);
      })
    }

    function addLast(data) {
      var msql = 'update TBLCARD_STATIC set actiondate = sysdate where cardacct = \'' + data.accnumber + '\'';

      ds.connector.query(msql, [], function (err, result) {
        if (err) console.error(err);
        cb(err, result);
      })
    }
  };

  tblcard_static.remoteMethod('actiondate', {
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
