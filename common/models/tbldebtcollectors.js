'use strict';

module.exports = function(tbldebtcollectors) {
  tbldebtcollectors.assigndebtcoll = function(data, cb) {
    var ds = tbldebtcollectors.dataSource;
    //
    var update_sql = "update tbldebtcollectors set assignedby = '" + data.assignedby + "', serviceprovider = '" + data.debtcollector + "', dateofinstr = '" + data.dateofinstr + "', followupdate = '" + data.followupdate + "'  where id = '" + data.debtcollid + "'";
    ds.connector.query(update_sql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  tbldebtcollectors.remoteMethod('assigndebtcoll', {
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
      path: '/assigndebtcoll',
      verb: 'post',
    },
  });

  tbldebtcollectors.editassigndebtcoll = function(data, cb) {
    var ds = tbldebtcollectors.dataSource;
    //
    var update_sql = "update tbldebtcollectors set assignedby = '" + data.assignedby + "', serviceprovider = '" + data.debtcollector + "', dateofinstr = '" + data.dateofinstr + "', followupdate = '" + data.followupdate + "'  where id = '" + data.debtcollid + "'";
    ds.connector.query(update_sql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  tbldebtcollectors.remoteMethod('editassigndebtcoll', {
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
      path: '/editassigndebtcoll',
      verb: 'post',
    },
  });

  tbldebtcollectors.updateaccdebtcoll = function(data, cb) {
    var ds = tbldebtcollectors.dataSource;
    //
    var update_sql = "update tbldebtcollectors set remarks = '" + data.updateremarks + "', newstatus = '" + data.statusupdate + "', status = '" + data.selectstatus + "', daterecalled = '" + data.daterecalled + "', updatedby = '" + data.updatedby + "'  where id = '" + data.updatedebtcollid + "'";
    ds.connector.query(update_sql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  tbldebtcollectors.remoteMethod('updateaccdebtcoll', {
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
      path: '/updateaccdebtcoll',
      verb: 'post',
    },
  });
};
