'use strict';

module.exports = function (Notehis) {
    Notehis.total = function (custnumber, cb) {
        var ds = Notehis.dataSource;
        //
        var total_sql = "Select count(*) total from notehis where custnumber = '" + custnumber +"'";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    Notehis.remoteMethod('total', {
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

    Notehis.custnotes = function (custnumber, offset, next, cb) {
        var ds = Notehis.dataSource;
        //
        var total_sql = "Select id,owner,custnumber,accnumber,to_char(notedate) notedate, notesrc,noteimp, notemade from notehis where custnumber = '" + custnumber +"' order by id desc offset "+offset+" rows fetch next "+next+" rows only";
        ds.connector.query(total_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })
    
    };
    
    Notehis.remoteMethod('custnotes', {
        accepts: [
            {
            arg: 'custnumber',
            type: 'string',
            http: {
                source: 'query',
            },
        },
        {
            arg: 'offset',
            type: 'number',
            http: {
                source: 'query',
            },
        },
        {
            arg: 'next',
            type: 'number',
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
            path: '/custnotes',
            verb: 'get',
        },
    });

    Notehis.updatenote = function (data, cb) {
        var ds = Notehis.dataSource;
        //
        var update_sql = "update notehis set notemade = '" + data.notemade +"' where id = '" + data.id +"'";
        ds.connector.query(update_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    Notehis.remoteMethod('updatenote', {
        accepts: {
            arg: 'data',
            type: 'object',
            http: {
                source: 'body',
            },
        },
        returns: {
            arg: 'result',
            type: 'object',
            root: true,
        },
        http: {
            path: '/updatenote',
            verb: 'post',
        },
    });
};
