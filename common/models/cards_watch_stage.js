'use strict';

module.exports = function (cards_watch_stage) {
  cards_watch_stage.search = function (searchtext, cb) {

    cards_watch_stage.find({
      where: {
        or: [
          { cardacct: { like: '%' + searchtext.toUpperCase() + '%' } },
          { cardnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
          { cardname: { like: '%' + searchtext.toUpperCase() + '%' } },
          { idnumber: { like: '%' + searchtext.toUpperCase() + '%' } }
        ]
      }
    }, function (err, data) {
      if (err) console.error(err);
      cb(err, data);
    });

  };

  cards_watch_stage.remoteMethod('search', {
    accepts: {
      arg: 'searchtext',
      type: 'string',
      http: {
        source: 'query',
      },
    },
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

  cards_watch_stage.totalcardswatch = function (cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var totalviewall_sql = "Select count(*) totalviewall from cards_watch_stage where cardstatus=0";
    ds.connector.query(totalviewall_sql, [], function (err, data) {
      if (err) console.error(err);
      cb(err, data);
    })

  };

  cards_watch_stage.remoteMethod('totalcardswatch', {
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/totalcardswatch',
      verb: 'get',
    },
  });

  cards_watch_stage.searchtotalcardswatch = function (searchstring,cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var sql = "Select count(*) totalviewall from cards_watch_stage where cardstatus=0 and upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ searchstring.toUpperCase() + "%'";
    // console.log(sql);
    ds.connector.query(sql, [], function (err, data) {
      if (err) console.error(err);
      cb(err, data);
    })

  };

  cards_watch_stage.remoteMethod('searchtotalcardswatch', {
    accepts: [
      {
        arg: 'searchstring',
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
      path: '/searchtotalcardswatch',
      verb: 'get',
    },
  });

  cards_watch_stage.searchcardswatch = function (searchstring,pagesize,currentposition,cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var sql = "Select * from cards_watch_stage where cardstatus=0 and upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ searchstring.toUpperCase() + "%' offset "+currentposition+" rows fetch next "+pagesize+" rows only";
    console.log(sql);
    ds.connector.query(sql, [], function (err, data) {
      if (err) console.error(err);
      cb(err, data);
    })

  };

  cards_watch_stage.remoteMethod('searchcardswatch', {
    accepts: [
      {
        arg: 'searchstring',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'pagesize',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'currentposition',
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
      path: '/searchcardswatch',
      verb: 'get',
    },
  });

  cards_watch_stage.allcards = function (pagesize,currentposition,cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var totalviewall_sql = "Select * from cards_watch_stage where cardstatus=0 order by outbalance offset "+pagesize*currentposition+" rows fetch next "+pagesize+" rows only";
    ds.connector.query(totalviewall_sql, [], function (err, data) {
      if (err) console.error(err);
      cb(err, data);
    })

  };

  cards_watch_stage.remoteMethod('allcards', {
    accepts: [
      {
        arg: 'pagesize',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'currentposition',
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
      path: '/allcards',
      verb: 'get',
    },
  });

  cards_watch_stage.select_filtered_viewall = function (pagesize, pagenum, sortdatafield, sortorder, filterscount, cb) {
    var ds = cards_watch_stage.dataSource;
    const start = pagesize * pagenum;
    //
    // console.log(pagesize, pagenum, sortdatafield, sortorder, filterscount);

    const where = "";
					if (filterscount > 0) {
						where = " WHERE (";
						const tmpdatafield = "";
						const tmpfilteroperator = "";
						
						for (let i=0; i < filterscount; i++){
							const filtervalue = info.getQueryParameters().getFirst("filtervalue" + i);
							const filtercondition = info.getQueryParameters().getFirst("filtercondition" + i);
							const filterdatafield = info.getQueryParameters().getFirst("filterdatafield" + i);
							const filteroperator = info.getQueryParameters().getFirst("filteroperator" + i);
							
							if (tmpdatafield.equals(""))
							{
								tmpdatafield = filterdatafield;			
							}
							else if (!tmpdatafield.equals(filterdatafield))
							{
								where += ")AND(";
							}
							else if (tmpdatafield.equals(filterdatafield))
							{
								if (tmpfilteroperator.equals("0"))
								{
									where += " AND ";
								}
								else where += " OR ";	
							}
								
							// build the "WHERE" clause depending on the filter's condition, value and datafield.
							switch(filtercondition){
							case "CONTAINS":
								where += " " + filterdatafield + " LIKE '%" + filtervalue + "%'";
								break;
							case "CONTAINS_CASE_SENSITIVE":
								where += " " + filterdatafield + " LIKE BINARY '%" + filtervalue + "%'";
								break;
							case "DOES_NOT_CONTAIN":
								where += " " + filterdatafield + " NOT LIKE '%" + filtervalue + "%'";
								break;
							case "DOES_NOT_CONTAIN_CASE_SENSITIVE":
								where += " " + filterdatafield + " NOT LIKE BINARY '%" + filtervalue + "%'";
								break;
							case "EQUAL":
								where += " " + filterdatafield + " = '" + filtervalue + "'";
								break;
							case "EQUAL_CASE_SENSITIVE":
								where += " " + filterdatafield + " LIKE BINARY '" + filtervalue + "'";
								break;
							case "NOT_EQUAL":
								where += " " + filterdatafield + " NOT LIKE '" + filtervalue + "'";
								break;
							case "NOT_EQUAL_CASE_SENSITIVE":
								where += " " + filterdatafield + " NOT LIKE BINARY '" + filtervalue + "'";
								break;
							case "GREATER_THAN":
								where += " " + filterdatafield + " > '" + filtervalue + "'";
								break;
							case "LESS_THAN":
								where += " " + filterdatafield + " < '" + filtervalue + "'";
								break;
							case "GREATER_THAN_OR_EQUAL":
								where += " " + filterdatafield + " >= '" + filtervalue + "'";
								break;
							case "LESS_THAN_OR_EQUAL":
								where += " " + filterdatafield + " <= '" + filtervalue + "'";
								break;
							case "STARTS_WITH":
								where += " " + filterdatafield + " LIKE '" + filtervalue + "%'";
								break;
							case "STARTS_WITH_CASE_SENSITIVE":
								where += " " + filterdatafield + " LIKE BINARY '" + filtervalue + "%'";
								break;
							case "ENDS_WITH":
								where += " " + filterdatafield + " LIKE '%" + filtervalue + "'";
								break;
							case "ENDS_WITH_CASE_SENSITIVE":
								where += " " + filterdatafield + " LIKE BINARY '%" + filtervalue + "'";
								break;
							case "NULL":
								where += " " + filterdatafield + " IS NULL";
								break;
							case "NOT_NULL":
								where += " " + filterdatafield + " IS NOT NULL";
								break;
							}
							if (i == filterscount - 1)
							{
								where += ")";
							}
								
							tmpfilteroperator = filteroperator;
							tmpdatafield = filterdatafield;
						}
					}
					const orderby = "";
					if (sortdatafield != null && sortorder != null && (sortorder.equals("asc") || sortorder.equals("desc")))
					{
						orderby = "order by " + sortdatafield + " " + sortorder;
					}


    var cards_watch_sql = "Select * from cards_watch_stage " + where + " " + orderby + " offset " + start + " rows fetch next " + pagesize + " rows only";
    ds.connector.query(cards_watch_sql, [], function (err, data) {
      if (err) console.error(err);
      data[0].totalRecords = 200;
      cb(err, data);
    })

  };

  cards_watch_stage.remoteMethod('select_filtered_viewall', {
    accepts: [
      {
        arg: 'pagesize',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'pagenum',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'sortdatafield',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'sortorder',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'filterscount',
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
      path: '/select_filtered_viewall',
      verb: 'get',
    },
  });
};
