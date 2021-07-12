'use strict';

module.exports = function(Tblreminders) {
  const cron = require('node-cron');

  Tblreminders.unread = function(submittedby, cb) {
    const ds = Tblreminders.dataSource;
    //
    const totalsql = "Select count(*) total from tblreminders where submittedby = '" + submittedby + "' and timeover = 'true' and read=0";

    ds.connector.query(totalsql, function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Tblreminders.remoteMethod('unread', {
    accepts: {
      arg: 'submittedby',
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
      path: '/unread',
      verb: 'get',
    },
  });

  Tblreminders.updatereminder = function(data, cb) {
    const ds = Tblreminders.dataSource;
    //
    const updatesql = "update tblreminders set issue = '" + data.ISSUE + "', status = '" + data.STATUS + "', description = '" + data.DESCRIPTION + "', priority = '" + data.PRIORITY + "', scheduledate = '" + data.SCHEDULEDATE + "', timeover = '" + data.TIMEOVER + "', reached = '" + data.REACHED + "' where id = " + data.ID;
    ds.connector.query(updatesql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Tblreminders.remoteMethod('updatereminder', {
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
      path: '/updatereminder',
      verb: 'post',
    },
  });

  Tblreminders.deleterreminder = function(data, cb) {
    const ds = Tblreminders.dataSource;
    //
    const deletesql = 'delete from tblreminders where id = ' + data.ID;

    ds.connector.query(deletesql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Tblreminders.remoteMethod('deleterreminder', {
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
      path: '/deleterreminder',
      verb: 'post',
    },
  });

  Tblreminders.reminderalerttracker = function(data, cb) {
    const ds = Tblreminders.dataSource;
    //
    const trackersql = 'update tblreminders set READ = 1 where id = ' + data.ID;

    ds.connector.query(trackersql, [], function(err) {
      console.log(trackersql);
      if (err) console.error(err);
      cb(err);
    });
  };

  Tblreminders.remoteMethod('reminderalerttracker', {
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
      path: '/reminderalerttracker',
      verb: 'post',
    },
  });

  cron.schedule('*/1 * * * * *', function() {
    // console.log('running a task every 5 seconds');
    const ds = Tblreminders.dataSource;
    //
    const reminderupdatesql = "update TBLREMINDERS set timeover = 'true', reached =" + 1 +
      " where to_date(SCHEDULEDATE, 'DD-MM-YYYY HH24:MI:SS')" +
      " < SYSDATE and timeover = 'false' and reached =" + 0 + 'and read =' + 0;

    ds.connector.query(reminderupdatesql, [], function(err) {
      if (err) console.error(err);
    });
    // UNCOMMENT CONSOLE log to see if cron is working
    // console.log('I am running every 1 seconds');
  });
};

