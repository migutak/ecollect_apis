'use strict';

module.exports = function(qcards) {
  qcards.search = function (searchtext, cb) {

    qcards.find({where: {or: [
            {cardacct: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}}
        ]}}, function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        });

      };
    
      qcards.remoteMethod('search', {
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
};
