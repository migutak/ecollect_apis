'use strict';

module.exports = function(mcoopcash_stage) {
    mcoopcash_stage.search = function (searchtext, cb) {
        var ds = mcoopcash_stage.dataSource;
        //
        var search_sql = "select * from mcoopcash_stage where loanaccnumber||clientname||arocode||idnumber||phonenumber like '%" + searchtext.toUpperCase() +"%'";
        /*ds.connector.query (search_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })*/

        mcoopcash_stage.find({where: {or: [
            {loanaccnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {clientname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {arocode: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {phonenumber: {like: '%'+searchtext.toUpperCase()+'%'}}
        ]}}, function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        });

      };
    
      mcoopcash_stage.remoteMethod('search', {
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

      mcoopcash_stage.totalviewall = function (cb) {
        var ds = mcoopcash_stage.dataSource;
        //
        var totalviewall_sql = "Select count(*) totalviewall from mcoopcash_stage";
        ds.connector.query (totalviewall_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      mcoopcash_stage.remoteMethod('totalviewall', {
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

      mcoopcash_stage.totalmyworklist = function (colofficer, cb) {
        var ds = mcoopcash_stage.dataSource;
        var totalmyworklist_sql = "Select count(*) totalmyworklist from mcoopcash_stage m join mcoopcash_static s on m.loanaccnumber=s.loanaccnumber where s.colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyworklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      mcoopcash_stage.remoteMethod('totalmyworklist', {
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

      mcoopcash_stage.totalmyallocation = function (cb) {
        var ds = mcoopcash_stage.dataSource;
        var totalmyallocation_sql = "Select count(*) totalmyallocation from mcoopcash_stage m join mcoopcash_static s on m.loanaccnumber=s.loanaccnumber where colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyallocation_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      mcoopcash_stage.remoteMethod('totalmyallocation', {
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

      mcoopcash_stage.worklist = function (colofficer, cb) {
        var ds = mcoopcash_stage.dataSource;
        //
        var worklist_sql = "Select * from mcoopcash_stage m join mcoopcash_static s on m.loanaccnumber=s.loanaccnumber where colofficer = '" + colofficer +"' and reviewdate<=sysdate";
   
        ds.connector.query (worklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      mcoopcash_stage.remoteMethod('worklist', {
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

      mcoopcash_stage.myallocations = function (colofficer, cb) {
        var ds = mcoopcash_stage.dataSource;
        //
        var myallocations_sql = "Select * from mcoopcash_stage m join mcoopcash_static s on m.loanaccnumber=s.loanaccnumber where colofficer = '" + colofficer +"'";
   
        ds.connector.query (myallocations_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      mcoopcash_stage.remoteMethod('myallocations', {
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
};
