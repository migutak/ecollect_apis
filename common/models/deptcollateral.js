'use strict';

module.exports = function(deptcollateral) {
    deptcollateral.total = function (custnumber, cb) {
        var ds = deptcollateral.dataSource;
        //
        var total_sql = "Select count(*) total from deptcollateral where custnumber = '" + custnumber +"'";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    deptcollateral.remoteMethod('total', {
        accepts: {
            arg: 'custnumber',
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
            path: '/total',
            verb: 'get',
        },
    });
};
