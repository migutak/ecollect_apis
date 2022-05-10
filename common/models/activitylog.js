'use strict';
var app = require('../../server/server');
module.exports = function (activitylog) {
    activitylog.action = function (msg, cb) {
      // save activity
      activitylog.create(msg, function(err, resp){
        if (err) console.error(err);
          // console.log('saved!!!', resp);
      })

    var ds = activitylog.dataSource;
    // add notes
    var notes_sql = "insert into notehis(custnumber, accnumber, notesrc, notemade, owner, noteimp) values ('"+msg.custnumber+"','"+msg.accountnumber+"','"+msg.notesrc+"','"+msg.collectornote+"','"+msg.owner+"','"+msg.noteimp+"')";
    ds.connector.query (notes_sql, [], function(err, notes) {
        if (err) console.error(err);
        // cb(err, notes);
    })
    // update tbl_portfolio_static , 
    //
    var portfolio_sql = "update tbl_portfolio_static set reviewdate='"+msg.reviewdate+"', excuse='"+msg.reason+"', actiondate='"+new Date()+"', excuse_other='"+msg.rfdother+"', cmdstatus='"+msg.cmdstatus+"', lastactiondate='"+new Date()+"', routetostate='" +msg.route+ "' where accnumber = '"+ msg.accountnumber + "'";
    ds.connector.query (portfolio_sql, [], function(err, portfolio) {
      if (err) console.error(err);
        //cb(err, portfolio);
    })
    // add ptp if any
    if(msg.ptp == 'YES') {
      var ptp_sql = "insert into ptps(accnumber, arramount, ptpamount, ptpdate, paymethod, owner) values ('"+msg.accountnumber+"',"+parseInt(msg.arramount)+","+parseInt(msg.ptpamount)+",'"+msg.ptpdate+"','"+msg.paymode+"','"+msg.owner+ "')";
      ds.connector.query (ptp_sql, [], function(err, ptp) {
        if (err) console.error(err);
          console.log(ptp)
          cb(err, ptp);
      })
    } else {
      cb (null, {rowsAffected: 1});
    }

  };

  activitylog.remoteMethod('action', {
    accepts: {
      arg: 'msg',
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
      path: '/action',
      verb: 'post',
    },
  });

};
