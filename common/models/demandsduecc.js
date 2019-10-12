'use strict';

module.exports = function(demandsduecc) {
    demandsduecc.search = function (searchtext, cb) {

        demandsduecc.find({where: {or: [
            {cardacct: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
        ]}}, function(err, cards) {
            if (err) console.error(err);
            cb(err, cards);
        });

      };
    
      demandsduecc.remoteMethod('search', {
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

      demandsduecc.totalviewall = function (cb) {
        var ds = demandsduecc.dataSource;
        //
        var total_sql = "Select count(*) totalviewall from demandsduecc";
        ds.connector.query (total_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      demandsduecc.remoteMethod('total', {
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
};
