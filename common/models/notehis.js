'use strict';
const paginate = require('jw-paginate');
// for activitylog count
module.exports = function (Notehis) {
  Notehis.total = function (custnumber, newcustnumber, cb) {
    const ds = Notehis.dataSource;
    //
    var total_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' or newcustnumber = '" + newcustnumber + "'";

    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Notehis.remoteMethod('total', {
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
      path: '/total',
      verb: 'get',
    },
  });

  // uploaded notes count
  Notehis.totalupload = function (custnumber, cb) {
    var ds = Notehis.dataSource;
    //
    var totaluploaded_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' and notesrc='uploaded a note'";

    ds.connector.query(totaluploaded_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Notehis.remoteMethod('totalupload', {
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
      path: '/totaluploaded',
      verb: 'get',
    },
  });

  // writen notes count
  Notehis.commenttotal = function (custnumber, cb) {
    var ds = Notehis.dataSource;
    //
    var commenttotal_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' and notesrc='made a comment'";

    ds.connector.query(commenttotal_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Notehis.remoteMethod('commenttotal', {
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
      path: '/commenttotal',
      verb: 'get',
    },
  });

  // view all notes per customer and export
  Notehis.allcustnotes = function (custnumber, newcustnumber, cb) {
    var ds = Notehis.dataSource;

    var allcustnotes_sql = "Select *  from vallnotes where custnumber = '" + custnumber + "' or newcustnumber = '" + newcustnumber + "'";

    ds.connector.query(allcustnotes_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  Notehis.remoteMethod('allcustnotes', {
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

    },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/allcustnotes',
      verb: 'get',
    },
  });

  // flagged notes count
  Notehis.flaggedtotal = function (custnumber, cb) {
    var ds = Notehis.dataSource;
    //
    var flaggedtotal_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' and noteimp='Y'";

    ds.connector.query(flaggedtotal_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    });
  };

  // writen notes count
  Notehis.commenttotal = function (custnumber, cb) {
    var ds = Notehis.dataSource;
    //
    var commenttotal_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' or newcustnumber='" + newcustnumber + "'";

    Notehis.custnotes = function (custnumber, cb) {
      var response = {};
      var ds = Notehis.dataSource;
      //
      var total_sql = "Select *  from notehis  where  custnumber = '" + custnumber + "' order by id desc ";
      ds.connector.query(total_sql, [], function (err, accounts) {
        if (err) console.error(err);
        cb(err, accounts);
      });
    };

    Notehis.remoteMethod('custnotes', {
      accepts: [
        {
          arg: 'custnumber',
          type: 'string',
          http: {
            source: 'query',
          },
        },
      ],
      returns: {
        arg: 'result',
        type: 'object',
        root: true,
      },
      http: {
        path: '/custnotes',
        verb: 'get',
      },
    });

    // NEW QUERY

    // Notehis.custnotes = function (custnumber, offset, next, cb) {
    //         var ds = Notehis.dataSource;
    //         //
    //         var total_sql = "select activitylogs.reason, notehis.notemade,notehis.owner, notesrc,noteimp, notehis.custnumber, notehis.accnumber, notehis.notesrc, notehis.notedate, notehis.id  from activitylogs, notehis where activitylogs.notemade =notehis.notemade and notehis.custnumber='" + custnumber + "' order by id desc offset "+offset+" rows fetch next "+next+" rows only;";
    //         ds.connector.query(total_sql, [], function (err, accounts) {
    //             if (err) console.error(err);
    //             cb(err, accounts);
    //         })

    //     };

    //     Notehis.remoteMethod('custnotes', {
    //         accepts: [
    //             {
    //             arg: 'custnumber',
    //             type: 'string',
    //             http: {
    //                 source: 'query',
    //             },
    //         },
    //         {
    //             arg: 'offset',
    //             type: 'number',
    //             http: {
    //                 source: 'query',
    //             },
    //         },
    //         {
    //             arg: 'next',
    //             type: 'number',
    //             http: {
    //                 source: 'query',
    //             },
    //         }
    //     ],
    //         returns: {
    //             arg: 'result',
    //             type: 'object',
    //             root: true,
    //         },
    //         http: {
    //             path: '/custnotes',
    //             verb: 'get',
    //         },
    //     });

    // END OF NEW QUERY

    Notehis.updatenote = function (data, cb) {
      var ds = Notehis.dataSource;
      //
      var update_sql = "update notehis set notemade = '" + data.notemade + "' where id = '" + data.id + "'";
      ds.connector.query(update_sql, [], function (err, accounts) {
        if (err) console.error(err);
        cb(err, accounts);
      });
    };

    Notehis.remoteMethod('updatenote', {
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
        path: '/updatenote',
        verb: 'post',
      },
    });
  }
};
