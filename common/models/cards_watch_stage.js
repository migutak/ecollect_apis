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

  cards_watch_stage.searchtotalcardswatch = function (searchstring, cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var sql = "Select count(*) totalviewall from cards_watch_stage where cardstatus=0 and upper(cardacct||cardnumber||cardname||NATIONID) like '%" + searchstring.toUpperCase() + "%'";
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

  cards_watch_stage.searchcardswatch = function (searchstring, pagesize, currentposition, cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var sql = "Select * from cards_watch_stage where cardstatus=0 and upper(cardacct||cardnumber||cardname||NATIONID) like '%" + searchstring.toUpperCase() + "%' offset " + currentposition + " rows fetch next " + pagesize + " rows only";
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

  cards_watch_stage.allcards = function (pagesize, currentposition, cb) {
    var ds = cards_watch_stage.dataSource;
    //
    var totalviewall_sql = "Select * from cards_watch_stage where cardstatus=0 order by outbalance offset " + pagesize * currentposition + " rows fetch next " + pagesize + " rows only";
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

      for (let i = 0; i < filterscount; i++) {
        const filtervalue = info.getQueryParameters().getFirst("filtervalue" + i);
        const filtercondition = info.getQueryParameters().getFirst("filtercondition" + i);
        const filterdatafield = info.getQueryParameters().getFirst("filterdatafield" + i);
        const filteroperator = info.getQueryParameters().getFirst("filteroperator" + i);

        if (tmpdatafield.equals("")) {
          tmpdatafield = filterdatafield;
        }
        else if (!tmpdatafield.equals(filterdatafield)) {
          where += ")AND(";
        }
        else if (tmpdatafield.equals(filterdatafield)) {
          if (tmpfilteroperator.equals("0")) {
            where += " AND ";
          }
          else where += " OR ";
        }

        // build the "WHERE" clause depending on the filter's condition, value and datafield.
        switch (filtercondition) {
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
        if (i == filterscount - 1) {
          where += ")";
        }

        tmpfilteroperator = filteroperator;
        tmpdatafield = filterdatafield;
      }
    }
    const orderby = "";
    if (sortdatafield != null && sortorder != null && (sortorder.equals("asc") || sortorder.equals("desc"))) {
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

  cards_watch_stage.gridviewall = function (request, cb) {
    var ds = cards_watch_stage.dataSource;
    const SQL = buildSql(request);
    ds.connector.query(SQL, [], function (err, result) {
      const rowCount = getRowCount(request, result);
      const resultsForPage = cutResultsToPageSize(request, result);

      cb(err, { rows: resultsForPage, lastRow: rowCount });
    })

  };

  cards_watch_stage.remoteMethod('gridviewall', {
    accepts: [
      {
        arg: 'body',
        type: 'object',
        http: {
          source: 'body',
        }
      }
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/gridviewall',
      verb: 'post',
    },
  });

  function buildSql(request) {
    const selectSql = createSelectSql(request);
    const fromSql = ' from ecol.cards_watch_stage ';
    const whereSql = createWhereSql(request);
    const limitSql = createLimitSql(request);

    const orderBySql = createOrderBySql(request);
    const groupBySql = createGroupBySql(request);

    const SQL = selectSql + fromSql + whereSql + groupBySql + orderBySql + limitSql;

    console.log(SQL);

    return SQL;
  }

  function createSelectSql(request) {
    //console.log(request)
    const rowGroupCols = request.rowGroupCols;
    const valueCols = request.valueCols;
    const groupKeys = request.groupKeys;

    if (isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToSelect = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToSelect.push(rowGroupCol.field);

      valueCols.forEach(function (valueCol) {
        colsToSelect.push(valueCol.aggFunc + '(' + valueCol.field + ') as ' + valueCol.field);
      });

      return ' select ' + colsToSelect.join(', ');
    }

    return ' select *';
  }

  function createFilterSql(key, item) {
    switch (item.filterType) {
      case 'text':
        return createTextFilterSql(key, item);
      case 'number':
        return createNumberFilterSql(key, item);
      default:
        console.log('unkonwn filter type: ' + item.filterType);
    }
  }

  function createNumberFilterSql(key, item) {
    switch (item.type) {
      case 'equals':
        return key + ' = ' + item.filter;
      case 'notEqual':
        return key + ' != ' + item.filter;
      case 'greaterThan':
        return key + ' > ' + item.filter;
      case 'greaterThanOrEqual':
        return key + ' >= ' + item.filter;
      case 'lessThan':
        return key + ' < ' + item.filter;
      case 'lessThanOrEqual':
        return key + ' <= ' + item.filter;
      case 'inRange':
        return '(' + key + ' >= ' + item.filter + ' and ' + key + ' <= ' + item.filterTo + ')';
      default:
        console.log('unknown number filter type: ' + item.type);
        return 'true';
    }
  }

  function createTextFilterSql(key, item) {
    switch (item.type) {
      case 'equals':
        return 'upper(' + key + ') = \'' + (item.filter).toUpperCase() + '\'';
      case 'notEqual':
        return 'upper(' + key + ') != \'' + (item.filter).toUpperCase() + '\'';
      case 'contains':
        return 'upper(' + key + ') like \'%' + (item.filter).toUpperCase() + '%\'';
      case 'notContains':
        return 'upper(' + key + ') not like \'%' + (item.filter).toUpperCase() + '%\'';
      case 'startsWith':
        return 'upper(' + key + ') like \'' + (item.filter).toUpperCase() + '%\'';
      case 'endsWith':
        return 'upper(' + key + ') like \'%' + (item.filter).toUpperCase() + '\'';
      default:
        console.log('unknown text filter type: ' + item.type);
        return 'true';
    }
  }

  function createWhereSql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const filterModel = request.filterModel;

    // console.log(filterModel)

    const that = this;
    const whereParts = [];

    if (groupKeys.length > 0) {
      groupKeys.forEach(function (key, index) {
        const colName = rowGroupCols[index].field;
        whereParts.push(colName + '= \'' + key + '\'')
        //   whereParts.push(colName +  '= "' + key + '"')
      });
    }

    if (filterModel) {
      const keySet = Object.keys(filterModel);
      keySet.forEach(function (key) {
        const item = filterModel[key];
        //console.log(item);
        //console.log('key__',key);
        whereParts.push(createFilterSql(key, item));
      });
    }

    if (whereParts.length > 0) {
      return ' where ' + whereParts.join(' and ');
    } else {
      return '';
    }
  }

  function createGroupBySql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;

    if (isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToGroupBy = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToGroupBy.push(rowGroupCol.field);

      return ' group by ' + colsToGroupBy.join(', ');
    } else {
      // select all columns
      return '';
    }
  }

  function createOrderBySql(request) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const sortModel = request.sortModel;

    const grouping = isDoingGrouping(rowGroupCols, groupKeys);

    const sortParts = [];
    if (sortModel) {

      const groupColIds =
        rowGroupCols.map(groupCol => groupCol.id)
          .slice(0, groupKeys.length + 1);

      sortModel.forEach(function (item) {
        if (grouping && groupColIds.indexOf(item.colId) < 0) {
          // ignore
        } else {
          sortParts.push(item.colId + ' ' + item.sort);
        }
      });
    }

    if (sortParts.length > 0) {
      return ' order by ' + sortParts.join(', ');
    } else {
      return '';
    }
  }

  function isDoingGrouping(rowGroupCols, groupKeys) {
    // we are not doing grouping if at the lowest level. we are at the lowest level
    // if we are grouping by more columns than we have keys for (that means the user
    // has not expanded a lowest level group, OR we are not grouping at all).
    return rowGroupCols.length > groupKeys.length;
  }

  function createLimitSql(request) {
    const startRow = request.startRow;
    const endRow = request.endRow;
    const pageSize = endRow - startRow;

    return ' OFFSET ' + startRow + ' ROWS FETCH NEXT ' + (pageSize + 1) + ' ROWS only'
    // return ' limit ' + (pageSize + 1) + ' offset ' + startRow;
  }


  function cutResultsToPageSize(request, results) {
    const pageSize = request.endRow - request.startRow;
    if (results && results.length > pageSize) {
      return results.splice(0, pageSize);
    } else {
      return results;
    }
  }

  function getRowCount(request, results) {
    if (results === null || results === undefined || results.length === 0) {
      return null;
    }
    const currentLastRow = request.startRow + results.length;
    return currentLastRow <= request.endRow ? currentLastRow : -1;
  }
};
