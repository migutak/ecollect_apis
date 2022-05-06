'use strict';

module.exports = function (Extletters) {
    Extletters.search = function (nationid, letterid, cb) {
        var ds = Extletters.dataSource;
        var q = "select * from extletters where lower(nationid) = '" + nationid.toLowerCase() + "' and lower(letterid) = '" + letterid.toLowerCase() + "'";
        ds.connector.query(q, [], function (err, data) {
            if (err) console.error(err);
            cb(err, data);
        })
    };

    Extletters.remoteMethod('search', {
        accepts: [
        {
            arg: 'nationid',
            type: 'string',
            http: {
                source: 'query',
            },
        },
        {
            arg: 'letterid',
            type: 'string',
            http: {
                source: 'query',
            },
        },
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
