'use strict';

module.exports = function(tcards) {
    tcards.search = function (searchtext, cb) {

      tcards.find({where: {or: [
            {cardacct: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {colofficer: {like: '%'+searchtext.toLowerCase()+'%'}}
        ]}}, function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        });

      };
    
      tcards.remoteMethod('search', {
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

      tcards.totalcreditcardsearch = function (searchstring,cb) {
        var ds = tcards.dataSource;
        var search = "";
        if(searchstring == undefined || searchstring == "") {
          search = '';
        } else {
          search = searchstring.toUpperCase();
        }
        //
        var sql = "Select count(*) totalviewall from tcards where upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ search + "%'";

        ds.connector.query(sql, [], function (err, data) {
          if (err) console.error(err);
          cb(err, data);
        })
    
      };
    
      tcards.remoteMethod('totalcreditcardsearch', {
        accepts: [
          {
            arg: 'searchstring',
            type: 'string',
            http: {
              source: 'query',
            },
          }
        ],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/totalcreditcardsearch',
          verb: 'get',
        },
      });

      tcards.totalviewall = function (cb) {
        var ds = tcards.dataSource;
        //
        var totalviewall_sql = "Select count(*) totalviewall from tcards";
        ds.connector.query (totalviewall_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('totalviewall', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/totalviewall',
          verb: 'get',
        },
      });

      tcards.searchall = function (searchstring,pagesize,currentposition,cb) {
        var ds = tcards.dataSource;
        var search = "";
        if(searchstring == undefined || searchstring == "") {
          search = '';
        } else {
          search = searchstring.toUpperCase();
        }
        //
        var sql = "Select * from tcards where upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ search + "%' offset "+currentposition+" rows fetch next "+pagesize+" rows only";

        ds.connector.query(sql, [], function (err, data) {
          if (err) console.error(err);
          cb(err, data);
        })
    
      };
    
      tcards.remoteMethod('searchall', {
        accepts: [
          {
            arg: 'searchstring',
            type: 'string',
            http: {
              source: 'query',
            },
          },
          {
            arg: 'pagesize',
            type: 'string',
            http: {
              source: 'query',
            },
          },
          {
            arg: 'currentposition',
            type: 'string',
            http: {
              source: 'query',
            },
          }
        ],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/searchall',
          verb: 'get',
        },
      });

      tcards.totalmyworklist = function (colofficer, cb) {
        var ds = tcards.dataSource;
        var totalmyworklist_sql = "Select count(*) totalmyworklist from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyworklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      tcards.remoteMethod('totalmyworklist', {
        accepts: {
            arg: 'colofficer',
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
          path: '/totalmyworklist',
          verb: 'get',
        },
      });

      tcards.totalmyallocation = function (colofficer,cb) {
        var ds = tcards.dataSource;
        var totalmyallocation_sql = "Select count(*) totalmyallocation from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyallocation_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      tcards.remoteMethod('totalmyallocation', {
        accepts: {
            arg: 'colofficer',
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
          path: '/totalmyallocation',
          verb: 'get',
        },
      });

      tcards.worklist = function (colofficer, cb) {
        var ds = tcards.dataSource;
        //
        var worklist_sql = "Select * from tcards where colofficer = '" + colofficer +"' and reviewdate<=sysdate";
   
        ds.connector.query (worklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      tcards.remoteMethod('worklist', {
        accepts: {
          arg: 'colofficer',
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
          path: '/worklist',
          verb: 'get',
        },
      });

      tcards.myallocations = function (colofficer, cb) {
        var ds = tcards.dataSource;
        //
        var myallocations_sql = "Select * from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (myallocations_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      tcards.remoteMethod('myallocations', {
        accepts: {
          arg: 'colofficer',
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
          path: '/myallocations',
          verb: 'get',
        },
      });

      tcards.closed = function (cb) {
        var ds = tcards.dataSource;
        //
        var closed_sql = "Select * from qcards where OUTBALANCE in (0,-1) and primary = 'P'";
   
        ds.connector.query (closed_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('closed', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/closed',
          verb: 'get',
        },
      });

      tcards.totalclosed = function (cb) {
        var ds = tcards.dataSource;
        //
        var closed_sql = "Select count(*) totalclosed from qcards where OUTBALANCE in (0,-1) and primary = 'P'";
   
        ds.connector.query (closed_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('totalclosed', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/totalclosed',
          verb: 'get',
        },
      });
};
