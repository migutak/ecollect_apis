'use strict';

module.exports = function (watch_stage) {
  watch_stage.total = function (cb) {
    var ds = watch_stage.dataSource;
    //
    var total_sql = "Select count(*) totalviewall from watch_stage";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  watch_stage.remoteMethod('total', {
    accepts: [],
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

  watch_stage.search = function (searchtext, page, limit, cb) {

    var ds = watch_stage.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
   var total_sql = "Select count(*) totalviewall from watch_stage where lower(accnumber||custname||custnumber||branchcode) like '%" + searchtext.toLowerCase() + "%'";

    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        watch_stage.find({
          where: {
            or: [
              { accnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { custname: { like: '%' + searchtext.toUpperCase() + '%' } },
              { arocode: { like: '%' + searchtext.toUpperCase() + '%' } },
              { custnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { branchcode: { like: '%' + searchtext.toUpperCase() + '%' } }
            ]
          }
        }, function (err, data) {
          if (err) console.error(err);
          response.rows = data;
          cb(err, response);
        });
      }
      // 
    })

  };

  watch_stage.remoteMethod('search',   {
    accepts: [
      {
        arg: 'searchtext',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'page',
        type: 'number',
        http: {
          source: 'query',
        }
      }, {
        arg: 'limit',
        type: 'number',
        http: {
          source: 'query',
        }
      }
    ],
    returns: {
      arg: 'result',
      type: 'array',
      root: true,
    },
    http: {
      path: '/search',
      verb: 'get',
    },
  });

  watch_stage.paged = function (page, limit, cb) {
    var ds = watch_stage.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from watch_stage";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        watch_stage.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });
      }
      // 
    })

  };

  watch_stage.remoteMethod('paged', {
    accepts: [
      {
        arg: 'page',
        type: 'number',
        http: {
          source: 'query',
        }
      }, {
        arg: 'limit',
        type: 'number',
        http: {
          source: 'query',
        }
      }
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/paged',
      verb: 'get',
    },
  });

  
};
