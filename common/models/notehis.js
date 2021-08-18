'use strict';

module.exports = function (Notehis) {
    Notehis.total = function (custnumber, cb) {
        var ds = Notehis.dataSource;
        //
        var total_sql = "Select count(*) total from vallnotes where custnumber = '" + custnumber + "'";
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
        if (!offset) {
            offset = 0;
        }
        if (!next) {
            next = 10;
        }
        //
        var notessql = "Select id,owner,custnumber,accnumber,to_char(notedate) notedate, notesrc,noteimp, notemade, reason from vallnotes where custnumber = '" + custnumber + "' offset " + offset + " rows fetch next " + next + " rows only";
        ds.connector.query(notessql, [], function (err, accounts) {
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
        var update_sql = "update notehis set notemade = '" + data.notemade + "' where id = '" + data.id + "'";
        ds.connector.query(update_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    // view all notes per customer and export
    Notehis.allcustnotes = function (custnumber, cb) {
        var ds = Notehis.dataSource;

        var allcustnotes_sql = "Select *  from notehis where custnumber = '" + custnumber + "'";

        ds.connector.query(allcustnotes_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        });
    };

    Notehis.remoteMethod('allcustnotes', {
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
            path: '/allcustnotes',
            verb: 'get',
        },
    });

    // writen notes count
    Notehis.commenttotal = function (custnumber, cb) {
        var ds = Notehis.dataSource;
        //
        var commenttotal_sql = "Select count(*) total from notehis where custnumber = '" + custnumber + "' and notesrc='made a comment'";

        ds.connector.query(commenttotal_sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        });
    };

    Notehis.remoteMethod('commenttotal', {
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
            path: '/commenttotal',
            verb: 'get',
        },
    });

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
