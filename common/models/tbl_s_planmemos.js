'use strict';

module.exports = function (tbl_s_planmemos) {
    tbl_s_planmemos.memoadd = function (inbody, cb) {
        var ds = tbl_s_planmemos.dataSource;
        var total = inbody.length;
        var last = total-1;
        for (var i = 0; i < total; i++) {
            //console.log(i==last)
            //console.log('for=' + i);
            if(i==last){
                addLast(inbody[i]);
            } else {
                add(inbody[i]);
            }
            
        }

        function add(data) {
            var msql = 'MERGE INTO tbl_s_planmemos d ' +
                    'USING (SELECT \'' + data.planid + '\' planid, \'' + data.memogroup + '\' memogroup, \'' + data.updateby + '\' updateby, \'' + data.plantitle + '\' plantitle from dual) s ' +
                    'ON (d.planid = s.planid AND d.memogroup = s.memogroup)' +
                    ' WHEN MATCHED THEN UPDATE SET d.updateby = s.updateby' +
                    ' WHEN NOT MATCHED THEN INSERT (planid, memogroup, updateby, plantitle) VALUES (s.planid, s.memogroup, s.updateby, s.plantitle)';
                  
            ds.connector.query(msql, [], function (err, result) {
                if (err) console.error(err);
                console.log('result', result)  
               //cb(err, null);
    
            })
        }
    
        function addLast(data) {
            var msql = 'MERGE INTO tbl_s_planmemos d ' +
                    'USING (SELECT \'' + data.planid + '\' planid, \'' + data.memogroup + '\' memogroup, \'' + data.updateby + '\' updateby, \'' + data.plantitle + '\' plantitle from dual) s ' +
                    'ON (d.planid = s.planid AND d.memogroup = s.memogroup)' +
                    ' WHEN MATCHED THEN UPDATE SET d.updateby = s.updateby' +
                    ' WHEN NOT MATCHED THEN INSERT (planid, memogroup, updateby, plantitle) VALUES (s.planid, s.memogroup, s.updateby, s.plantitle)';
                  
            ds.connector.query(msql, [], function (err, result) {
                if (err) console.error(err);
                console.log('last',result)  
               cb(err, result);
    
            })
        }
    };

    tbl_s_planmemos.remoteMethod('memoadd', {
        accepts: {
            arg: 'inbody',
            type: 'array',
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
            path: '/memoadd',
            verb: 'post',
        },
    });

    
};
