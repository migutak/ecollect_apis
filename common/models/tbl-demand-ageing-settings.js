'use strict';

module.exports = function(Tbldemandageingsettings) {


    Tbldemandageingsettings.insertorupdate = async (msg, cb) => {
        try {
		    let result = await Tbldemandageingsettings.find({where: { and: [{letterid: msg.letterid}, {memogroup: msg.memogroup}, {daysinarr: msg.daysinarr}]}});
		   
        	if (result.length > 0) {
        		msg.id = result[0].id;

			    await Tbldemandageingsettings.replaceById(msg.id, msg);
			    cb(null, {result: 'updated'});
			}else {
			    await Tbldemandageingsettings.create(msg);
			    cb(null, {result: 'created'});
			}
		} catch (e) {
		    console.error(e);
		    cb(null, {result: 'error'});
		}
        
        
    }

    Tbldemandageingsettings.remoteMethod('insertorupdate', {
        accepts: [
            {
                arg: 'msg',
                type: 'object',
                http: {
                    source: 'body',
                },
            }
        ],
        returns: {
            arg: 'result',
            type: 'array',
            root: true,
        },
        http: {
            path: '/insertorupdate',
            verb: 'post',
        },
    });

    Tbldemandageingsettings.checkduplicate = async (msgIn, cb) => {
    	var msg = [];
    	//
    	for(var x=0; x<msgIn.memogroup.length; x++){
    		var data = {};
    		data["letterid"] = msgIn.letterid
    		data["daysinarr"] = msgIn.daysinarr
    		data["owner"] = msgIn.owner
    		data["lastupdate"] = msgIn.lastupdate
    		data["status"] = msgIn.status
            data["expirydays"] = msgIn.expirydays
    		data["memogroup"] = msgIn.memogroup[x]

    		msg[x] = data;
    	}
    	//
    	//let result = [];
    	for(let i=0; i<msg.length; i++){
	        try {
			    let result = await Tbldemandageingsettings.find({where: { and: [{letterid: msg[i].letterid}, {memogroup: msg[i].memogroup}, {daysinarr: msg[i].daysinarr}]}});
                console.log(result)
	        	if (result.length > 0) {
	        		msg[i].isduplicate = true;
	        		msg[i].iserror = false;
	        		//result.push(msg[i]);
				    
				}else {
				    msg[i].isduplicate = false;
				    msg[i].iserror = false;
				    //result.push(msg[i]);
				}
			} catch (e) {
			    console.error(e);
			    msg[i].iserror = false;
			    msg[i].isduplicate = null;
			    //result.push(msg[i]);
			}
        }

        cb(null, msg);
        
    }

    Tbldemandageingsettings.remoteMethod('checkduplicate', {
        accepts: [
            {
                arg: 'msgIn',
                type: 'object',
                http: {
                    source: 'body',
                },
            }
        ],
        returns: {
            arg: 'result',
            type: 'array',
            root: true,
        },
        http: {
            path: '/checkduplicate',
            verb: 'post',
        },
    });

};
