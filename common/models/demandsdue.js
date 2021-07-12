'use strict';

module.exports = function (Demandsdue) {

    Demandsdue.total = function (cb) {
        var ds = Demandsdue.dataSource;
        //
        var total_sql = "Select count(*) totalviewall from demandsdue";
        ds.connector.query(total_sql, [], function (err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

    };

    Demandsdue.remoteMethod('total', {
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

    Demandsdue.totalsearch = function (searchtext, cb) {
        if (searchtext == undefined) {
            searchtext = '';
        }
        var ds = Demandsdue.dataSource;
        //
        var sql = "Select count(*) totalviewall from demandsdue where upper(client_name||accnumber||custnumber||demandletter||branchcode) like '%" + searchtext.toUpperCase() + "%'";
        console.log(sql);
        ds.connector.query(sql, [], function (err, demands) {
            if (err) console.error(err);
            cb(err, demands);
        })

    };

    Demandsdue.remoteMethod('totalsearch', {
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
            type: 'object',
            root: true,
        },
        http: {
            path: '/totalsearch',
            verb: 'get',
        },
    });


    Demandsdue.search = function (searchtext, limit, page, cb) {
        if (searchtext == undefined) {
            searchtext = '';
        }
        Demandsdue.find({
            where: {
                or: [
                    { accnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
                    { client_name: { like: '%' + searchtext.toUpperCase() + '%' } },
                    { custnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
                    { demandletter: { like: '%' + searchtext.toLowerCase() + '%' } },
                    { branchcode: { like: '%' + searchtext.toUpperCase() + '%' } }
                ]
            },
            skip: page,
            limit: limit
        }, function (err, demands) {
            if (err) console.error(err);
            cb(err, demands);
        });

    };

    Demandsdue.remoteMethod('search', {
        accepts: [{
            arg: 'searchtext',
            type: 'string',
            http: {
                source: 'query',
            },
        },
        {
            arg: 'limit',
            type: 'number',
            http: {
                source: 'query',
            },
        },
        {
            arg: 'page',
            type: 'number',
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
