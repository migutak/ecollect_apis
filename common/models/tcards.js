'use strict';

module.exports = function(tcards) {
    tcards.search = function (searchtext, cb) {

      tcards.find({where: {or: [
            {cardacct: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {cardname: {like: '%'+searchtext.toUpperCase()+'%'}},
            {idnumber: {like: '%'+searchtext.toUpperCase()+'%'}},
            {colofficer: {like: '%'+searchtext.toLowerCase()+'%'}}
        ]}}, function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        });

      };
    
      tcards.remoteMethod('search', {
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

      tcards.totalcreditcardsearch = function (searchstring,cb) {
        var ds = tcards.dataSource;
        var search = "";
        if(searchstring == undefined || searchstring == "") {
          search = '';
        } else {
          search = searchstring.toUpperCase();
        }
        //
        var sql = "Select count(*) totalviewall from tcards where upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ search + "%'";

        ds.connector.query(sql, [], function (err, data) {
          if (err) console.error(err);
          cb(err, data);
        })
    
      };
    
      tcards.remoteMethod('totalcreditcardsearch', {
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
          path: '/totalcreditcardsearch',
          verb: 'get',
        },
      });

      tcards.totalviewall = function (cb) {
        var ds = tcards.dataSource;
        //
        var totalviewall_sql = "Select count(*) totalviewall from tcards";
        ds.connector.query (totalviewall_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('totalviewall', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/totalviewall',
          verb: 'get',
        },
      });

      tcards.searchall = function (searchstring,pagesize,currentposition,cb) {
        var ds = tcards.dataSource;
        var search = "";
        if(searchstring == undefined || searchstring == "") {
          search = '';
        } else {
          search = searchstring.toUpperCase();
        }
        //
        var sql = "Select * from tcards where upper(cardacct||cardnumber||cardname||NATIONID) like '%"+ search + "%' offset "+currentposition+" rows fetch next "+pagesize+" rows only";

        ds.connector.query(sql, [], function (err, data) {
          if (err) console.error(err);
          cb(err, data);
        })
    
      };
    
      tcards.remoteMethod('searchall', {
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
          path: '/searchall',
          verb: 'get',
        },
      });

      tcards.totalmyworklist = function (colofficer, cb) {
        var ds = tcards.dataSource;
        var totalmyworklist_sql = "Select count(*) totalmyworklist from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyworklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      tcards.remoteMethod('totalmyworklist', {
        accepts: {
            arg: 'colofficer',
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
          path: '/totalmyworklist',
          verb: 'get',
        },
      });

      tcards.totalmyallocation = function (colofficer,cb) {
        var ds = tcards.dataSource;
        var totalmyallocation_sql = "Select count(*) totalmyallocation from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (totalmyallocation_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })
      };
    
      tcards.remoteMethod('totalmyallocation', {
        accepts: {
            arg: 'colofficer',
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
          path: '/totalmyallocation',
          verb: 'get',
        },
      });

      tcards.worklist = function (colofficer, cb) {
        var ds = tcards.dataSource;
        //
        var worklist_sql = "Select * from tcards where colofficer = '" + colofficer +"' and reviewdate<=sysdate";
   
        ds.connector.query (worklist_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      tcards.remoteMethod('worklist', {
        accepts: {
          arg: 'colofficer',
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
          path: '/worklist',
          verb: 'get',
        },
      });

      tcards.myallocations = function (colofficer, cb) {
        var ds = tcards.dataSource;
        //
        var myallocations_sql = "Select * from tcards where colofficer = '" + colofficer +"'";
   
        ds.connector.query (myallocations_sql, [], function(err, mcoop) {
            if (err) console.error(err);
            cb(err, mcoop);
        })

      };
    
      tcards.remoteMethod('myallocations', {
        accepts: {
          arg: 'colofficer',
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
          path: '/myallocations',
          verb: 'get',
        },
      });

      tcards.closed = function (cb) {
        var ds = tcards.dataSource;
        //
        var closed_sql = "Select * from qcards where OUTBALANCE in (0,-1) and primary = 'P'";
   
        ds.connector.query (closed_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('closed', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/closed',
          verb: 'get',
        },
      });

      tcards.totalclosed = function (cb) {
        var ds = tcards.dataSource;
        //
        var closed_sql = "Select count(*) totalclosed from qcards where OUTBALANCE in (0,-1) and primary = 'P'";
   
        ds.connector.query (closed_sql, [], function(err, data) {
            if (err) console.error(err);
            cb(err, data);
        })

      };
    
      tcards.remoteMethod('totalclosed', {
        accepts: [],
        returns: {
          arg: 'result',
          type: 'object',
          root: true,
        },
        http: {
          path: '/totalclosed',
          verb: 'get',
        },
      });

      tcards.gridviewall = function (request, cb) {
        var ds = tcards.dataSource;
        const SQL = buildSql(request);
        ds.connector.query(SQL, [], function (err, result) {
          const rowCount = getRowCount(request, result);
          const resultsForPage = cutResultsToPageSize(request, result);
          
                cb(err, {rows: resultsForPage, lastRow: rowCount});
        })
    
      };
    
      tcards.remoteMethod('gridviewall', {
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
        const fromSql = ' from ecol.tcards ';
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
                whereParts.push(colName +  '= \'' + key + '\'')
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
