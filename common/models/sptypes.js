'use strict';

module.exports = function(sptypes) {
    sptypes.expired = function (cb) {

        var ds = sptypes.dataSource;
        var query = "select * from sptypes where endofindemnity is null OR to_date(upper(endofindemnity),'DD-MON-YYYY') <sysdate";

        ds.connector.query(query, [], function (error, result) {
            if (error) console.error(error);
            cb(error, result);
        })
    }

    sptypes.remoteMethod('expired', {
        accepts: [],
        returns: {
            arg: 'result',
            type: 'array',
            root: true,
        },
        http: {
            path: '/expired',
            verb: 'get',
        },
    });
};
