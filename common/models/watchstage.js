'use strict';

module.exports = function (watch_stage) {
  watch_stage.total = function (cb) {
    var ds = watch_stage.dataSource;
    //
    var total_sql = "Select count(*) totalviewall from watch_stage";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) console.error(err);
      cb(err, accounts);
    })

  };

  watch_stage.remoteMethod('total', {
    accepts: [],
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

  watch_stage.search = function (searchtext, page, limit, cb) {

    var ds = watch_stage.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
   var total_sql = "Select count(*) totalviewall from watch_stage where lower(accnumber||custname||custnumber||branchcode) like '%" + searchtext.toLowerCase() + "%'";

    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        watch_stage.find({
          where: {
            or: [
              { accnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { custname: { like: '%' + searchtext.toUpperCase() + '%' } },
              { arocode: { like: '%' + searchtext.toUpperCase() + '%' } },
              { custnumber: { like: '%' + searchtext.toUpperCase() + '%' } },
              { branchcode: { like: '%' + searchtext.toUpperCase() + '%' } }
            ]
          }
        }, function (err, data) {
          if (err) console.error(err);
          response.rows = data;
          cb(err, response);
        });
      }
      // 
    })

  };

  watch_stage.remoteMethod('search',   {
    accepts: [
      {
        arg: 'searchtext',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'page',
        type: 'number',
        http: {
          source: 'query',
        }
      }, {
        arg: 'limit',
        type: 'number',
        http: {
          source: 'query',
        }
      }
    ],
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

  watch_stage.paged = function (page, limit, cb) {
    var ds = watch_stage.dataSource;
    var response = {};
    if (page == undefined || limit == undefined) {
      page = 0;
      limit = 1;
    };
    //
    var total_sql = "Select count(*) totalviewall from watch_stage";
    ds.connector.query(total_sql, [], function (err, accounts) {
      if (err) {
        console.error(err);
      } else {
        response.total = accounts[0].TOTALVIEWALL;
        watch_stage.find({ limit: limit, skip: page }, function (err, data) {
          if (err) console.log(err);
          response.rows = data;
          cb(err, response);
        });
      }
      // 
    })

  };

  watch_stage.remoteMethod('paged', {
    accepts: [
      {
        arg: 'page',
        type: 'number',
        http: {
          source: 'query',
        }
      }, {
        arg: 'limit',
        type: 'number',
        http: {
          source: 'query',
        }
      }
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: {
      path: '/paged',
      verb: 'get',
    },
  });

  watch_stage.gridviewall_loans = function (request, cb) {
    var ds = watch_stage.dataSource;
    const SQL = buildSql(request);
    ds.connector.query(SQL, [], function (err, result) {
      const rowCount = getRowCount(request, result);
      const resultsForPage = cutResultsToPageSize(request, result);
      
            cb(err, {rows: resultsForPage, lastRow: rowCount});
    })

  };

  watch_stage.remoteMethod('gridviewall_loans', {
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
      path: '/gridviewall_loans',
      verb: 'post',
    },
  });

  
function buildSql(request) {
  const selectSql = createSelectSql(request);
  const fromSql = ' from watch_stage ';
  const whereSql = createWhereSql(request);
  const limitSql = createLimitSql(request);

  const orderBySql = createOrderBySql(request);
  const groupBySql = createGroupBySql(request);

  const SQL = selectSql + fromSql + whereSql + groupBySql + orderBySql + limitSql;

  console.log(SQL);

  return SQL;
}

function createSelectSql(request) {
  console.log(request)
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
          whereParts.push(colName +  '= \'' + key + '\'')
          //   whereParts.push(colName +  '= "' + key + '"')
      });
  }

  if (filterModel) {
      const keySet = Object.keys(filterModel);
      keySet.forEach(function (key) {
          const item = filterModel[key];
          console.log(item);
          console.log('key__',key);
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
