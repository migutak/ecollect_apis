'use strict';

module.exports = function(Permissionsettings) {

    Permissionsettings.setpermission = function (msg, cb) {
        // console.log(msg);
        var attr = msg.attr;
        var role_id = msg.role_id;
        var perm_id = msg.perm_id;

        var ds = Permissionsettings.dataSource;

        var sql = "update permissionsettings set attr = '" + attr + "' where role_id = '" + role_id + "' and perm_id = '" + perm_id + "'";

        ds.connector.query(sql, [], function (err, Permissionsettings) {
            if (err) console.error(err);
            cb(err, Permissionsettings);
        });
    };

    Permissionsettings.remoteMethod('setpermission',
        {
            http: { verb: 'POST' },
            description: 'update permissions for the role',
            accepts: { arg: 'msg', type: 'object', http: {source: 'body'} },
            returns: { arg: 'data', type: Array, root: true }
        }
    );
};
