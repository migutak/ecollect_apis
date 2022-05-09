'use strict';

module.exports = function (planswot) {

    planswot.add = function (inbody, cb) {
        var ds = planswot.dataSource;


        var msql = 'MERGE INTO plan_swot d ' +
            'USING (SELECT \'' + inbody.planid + '\' planid, \'' + inbody.accnumber + '\' accnumber, \'' + inbody.custnumber + '\' custnumber, \'' + inbody.strengths + '\' strengths, \'' + inbody.weaknesses + '\' weaknesses, \'' + inbody.opportunities + '\' opportunities, \'' + inbody.threats + '\' threats, \'' + inbody.owner + '\' owner from dual) s ' +
            'ON (d.planid = s.planid AND d.accnumber = s.accnumber)' +
            ' WHEN MATCHED THEN UPDATE SET d.strengths = s.strengths,d.weaknesses = s.weaknesses,d.opportunities = s.opportunities,d.threats = s.threats' +
            ' WHEN NOT MATCHED THEN INSERT (planid, accnumber, custnumber, strengths,weaknesses,opportunities,threats,owner) VALUES (s.planid, s.accnumber, s.custnumber, s.strengths,s.weaknesses,s.opportunities,s.threats,s.owner)';

        ds.connector.query(msql, [], function (err, result) {
            if (err) console.error(err);
            cb(err, result);
        })
    };

    planswot.remoteMethod('add', {
        accepts: {
            arg: 'inbody',
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
            path: '/add',
            verb: 'post',
        },
    });

};
