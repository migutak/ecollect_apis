'use strict';

module.exports = function (Tblusers) {
    Tblusers.search = function (username, cb) {

        var ds = Tblusers.dataSource;
        var q = "select * from tblusers where lower(username) = '"+username.toLowerCase()+"' ";
        ds.connector.query(q, [], function (err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

    };

    Tblusers.remoteMethod('search', {
        accepts: {
            arg: 'username',
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
