'use strict';

module.exports = function (qall) {
  qall.total = function (cb) {
    var ds = qall.dataSource;
    //
    var total_sql = "Select count(*) totalviewall from qall";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  qall.remoteMethod('total', {
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

  qall.search = function (searchtext, cb) {

    qall.find({
      where: {
        or: [
          { accnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
          { client_name: { like: '%' + searchtext.toUpperCase() + '%' } },
          { arocode: { like: '%' + searchtext.toUpperCase() + '%' } },
          { custnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
          { branchname: { like: '%' + searchtext.toUpperCase() + '%' } },
          { colofficer: { like: '%' + searchtext.toUpperCase() + '%' } },
          { section: { like: '%' + searchtext.toUpperCase() + '%' } }
        ]
      }
    }, function (err, mcoop) {
      if (err) console.error(err);
      cb(err, mcoop);
    });

  };

  qall.remoteMethod('search', {
    accepts: {
      arg: 'searchtext',
      type: 'string',
      http: {
        source: 'query',
      },
    },
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

  qall.paged = function (page, limit, cb) {
    var ds = qall.dataSource;
    var response = {};
    if(page==undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from qall";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        qall.find({limit: limit, skip: page},  function(err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });
      }
      // 
    })

  };

  qall.remoteMethod('paged', {
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
