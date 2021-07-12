'use strict';

module.exports = function(teles) {
    teles.total = function (custnumber, cb) {
        var ds = teles.dataSource;
        //
        var total_sql = "Select count(*) total from teles where custnumber = '" + custnumber +"'";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    teles.remoteMethod('total', {
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

    teles.alltele = function (custnumber, cb) {
        var ds = teles.dataSource;
        //
        var total_sql = "Select person mobile, custnumber, active from teles where custnumber = '" + custnumber +"' and person is not null and person !=1 union Select telephone mobile, custnumber, active from teles where custnumber = '" + custnumber +"' and telephone is not null and active ='Yes' union Select tel mobile, cardacct, 'true' active from tcards where cardacct = '" + custnumber +"' and tel is not null union Select mobile, cardacct, 'true' active from tcards where cardacct = '" + custnumber +"' and mobile is not null union Select phone mobile, cardacct, 'true' active from tcards where cardacct = '" + custnumber +"' and phone is not null union Select telnumber, custnumber, 'true' active from tqall where custnumber = '" + custnumber +"' and telnumber is not null union Select celnumber, custnumber, 'true' active from tqall where custnumber = '" + custnumber +"' and celnumber is not null";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    teles.remoteMethod('alltele', {
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
            path: '/alltele',
            verb: 'get',
        },
    });
};
