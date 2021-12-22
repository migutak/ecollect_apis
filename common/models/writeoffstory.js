'use strict';

module.exports = function(Writeoffstory) {
    Writeoffstory.export = function (cb) {
        var ds = Writeoffstory.dataSource;
        //
        var sql = "Select w.*,t.client_name, t.rrocode,t.arocode,t.branchname,t.region,t.oustbalance from writeoffstory w left join tqall t on t.accnumber = w.accnumber";
        ds.connector.query(sql, [], function (err, accounts) {
            if (err) console.error(err);
            cb(err, accounts);
        })

    };

    Writeoffstory.remoteMethod('export', {
        returns: {
            arg: 'result',
            type: 'object',
            root: true,
        },
        http: {
            path: '/export',
            verb: 'get',
        },
    });
};
