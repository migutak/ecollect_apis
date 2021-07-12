'use strict';

module.exports = function (tqall) {
  tqall.total = function (cb) {
    var ds = tqall.dataSource;
    //
    var total_sql = "Select count(*) totalviewall from qall";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  tqall.remoteMethod('total', {
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

 // insurance

  tqall.insurance = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from insurances";
    var sql = "Select * from insurances";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('insurance', {
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
      path: '/insurance',
      verb: 'get',
    },
  });

  // Service Providers- Marketors

  tqall.marketors = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tblmarketors";
    var sql = "Select * from tblmarketors";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('marketors', {
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
      path: '/marketors',
      verb: 'get',
    },
  });

  // Service Providers- debt Collectors

  tqall.debtcollectors = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tbldebtcollectors";
    var sql = "Select * from tbldebtcollectors";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('debtcollectors', {
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
      path: '/debtcollectors',
      verb: 'get',
    },
  });





// Reminders

  tqall.reminders = function (submittedby, cb) {
    var ds = tqall.dataSource;
    var response = {};

    //
    var total_sql = "Select count(*) totalviewall from tblreminders where submittedby = '" + submittedby + "'";
    var sql = "Select * from tblreminders where submittedby = '" + submittedby + "' order by scheduledate desc ";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('reminders', {
    accepts: [
      {
        arg: 'submittedby',
        type: 'string',
        http: {
          source: 'query',
        }
      },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/reminders',
      verb: 'get',
    },
  });



  // Service Providers- Investigators

  tqall.investigators = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tblinvestigators";
    var sql = "Select * from tblinvestigators";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('investigators', {
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
      path: '/investigators',
      verb: 'get',
    },
  });


  // Service Providers- Valuers

  tqall.valuers = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tblvaluers";
    var sql = "Select * from tblvaluers";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('valuers', {
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
      path: '/valuers',
      verb: 'get',
    },
  });

  // Service Providers- Yards

  tqall.yards = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tblyards";
    var sql = "Select * from tblyards";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('yards', {
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
      path: '/yards',
      verb: 'get',
    },
  });

  tqall.search = function (searchtext, page, limit, cb) {

    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tqall where lower(accnumber||client_name||arocode||rrocode||custnumber||branchname||colofficer||section) like '%" + searchtext.toLowerCase() + "%'";
    var sql = "Select * from tqall where lower(accnumber||client_name||arocode||rrocode||custnumber||branchname||colofficer||section) like '%" + searchtext.toLowerCase() + "%'";

    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({
          where: {
            or: [
              { accnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { client_name: { like: '%' + searchtext.toUpperCase() + '%' } },
              { arocode: { like: '%' + searchtext.toUpperCase() + '%' } },
              { rrocode: { like: '%' + searchtext.toUpperCase() + '%' } },
              { custnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { branchname: { like: '%' + searchtext.toUpperCase() + '%' } },
              { colofficer: { like: '%' + searchtext.toLowerCase() + '%' } },
              { section: { like: '%' + searchtext.toUpperCase() + '%' } }
            ]
          }
        }, function (err, data) {
          if (err) console.error(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('search',   {
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

  // searchwithoutloanods

  tqall.searchwithoutloanods = function (searchtext, page, limit, cb) {

    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tqall where productcode not in ('savings', 'LoanOD', 'SAMinBal') and lower(accnumber||client_name||arocode||rrocode||custnumber||branchname||colofficer||section) like '%" + searchtext.toLowerCase() + "%'";
    var sql = "Select * from tqall where productcode not in ('savings', 'LoanOD', 'SAMinBal', 'CAwOD') and lower(accnumber||client_name||arocode||rrocode||custnumber||branchname||colofficer||section) like '%" + searchtext.toLowerCase() + "%'";

    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
            response.rows = data;
            cb(err, response);
        })
      }
      //
    })

  };

  tqall.remoteMethod('searchwithoutloanods',   {
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
      path: '/searchwithoutloanods',
      verb: 'get',
    },
  });


  tqall.paged = function (page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from tqall";
    var sql = "Select * from tqall offset " + page + " rows FETCH NEXT " + limit + " ROWS ONLY";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        ds.connector.query(sql, [], function (error, data) {
          if (error) console.error(error);
          response.rows = data;
          cb(err, response);
        })
        /*tqall.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });*/
      }
      //
    })

  };

  tqall.remoteMethod('paged', {
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

  tqall.pagedmyallocation = function (colofficer, page, limit, cb) {
    var ds = tqall.dataSource;
    var response = {};
    // if (page == undefined || limit == undefined) {
    //   page = 0;
    //   limit = 5;
    // };
    //
    var total_sql = "Select count(*) totalviewall from tqall where colofficer = '" + colofficer + "'";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        tqall.find({where: {colofficer: colofficer}, limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });
      }
      //
    })

  };

  tqall.remoteMethod('pagedmyallocation', {
    accepts: [
      {
        arg: 'colofficer',
        type: 'string',
        http: {
          source: 'query',
        }
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
      type: 'object',
      root: true,
    },
    http: {
      path: '/paged/myallocation',
      verb: 'get',
    },
  });




};
