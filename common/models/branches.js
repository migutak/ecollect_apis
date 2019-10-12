'use strict';

module.exports = function (branches) {
    branches.search = function (searchtext, cb) {
        branches.find({where: {or: [
            {branchcode: {like: '%'+searchtext.toUpperCase()+'%'}},
            {branchname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {manager: {like: '%'+searchtext.toUpperCase()+'%'}}
        ]}}, function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        });

    };

    branches.remoteMethod('search', {
        accepts: [
            {
                arg: 'searchtext',
                type: 'string',
                http: {
                    source: 'query',
                },
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
};
