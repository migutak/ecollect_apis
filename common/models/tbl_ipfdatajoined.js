'use strict';

module.exports = function(Tblipfdatajoined) {
  Tblipfdatajoined.total = function(accnumber, cb) {
    const response = {};
    const ds = Tblipfdatajoined.dataSource;
    //
    const totalsql = "SELECT f.accnumber, f.custnumber, f.custname, f.productcode, f.daysinarr, f.arrearsamount, f.telnumber, f.celnumber, p.policynumber, p.policystartdate, p.policyenddate, p.insurance_company, p.broker_agent, l.branchname, l.loanstartdate FROM TBL_IPF f LEFT JOIN TBL_IPF_DETAILS p ON f.accnumber = p.accnumber INNER JOIN LOANS_STAGE l ON f.accnumber = l.accnumber where f.accnumber = '" + accnumber + "'";

    ds.connector.query(totalsql, [], function(err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
      console.log(totalsql);
    });
  };

  Tblipfdatajoined.remoteMethod('total', {
    accepts:
    {
      arg: 'accnumber',
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
