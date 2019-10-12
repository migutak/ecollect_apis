
module.exports = function (EmailModel) {
  EmailModel.email = function (msg, cb) {
    console.log(msg);
    let g_email = [];
    if(msg.guarantor && msg.guarantor.length>0){
      for(let i=0; i<msg.guarantor.length; i++){
        g_email.push(msg.guarantor[i].email)
      }
    }
    // console.log(g_email);
    let title = "Demand Letter"
    console.log('title=' + msg.title);
    if (msg.title == 'overduecc'){
      title = 'Credit Card Overdue Demand Letter'
    } else if(msg.title == 'prelisting') {
      title = 'Pre-Listing Letter'
    }else if(msg.title == 'suspension') {
      title = 'Credit Card Suspension Letter'
    }else if(msg.title == 'Demand1') {
      title = 'Pre-Listing Letter'
    }else if(msg.title == 'Demand2') {
      title = 'First Demand Letter'
    }else if(msg.title == 'Demand2') {
      title = 'Second Demand Letter'
    }

    var send = require('gmail-send')({
      user: 'migutak@gmail.com',
      // user: credentials.user,                  // Your GMail account used to send emails 123@Today
      pass: 'epptzayqbxsknlgm',
      // pass: credentials.pass,                  // Application-specific password
      to: msg.email,
      // to:   credentials.user,                  // Send to yourself
      // you also may set array of recipients:
      // [ 'user1@gmail.com', 'user2@gmail.com' ]
      // from:    credentials.user,            // from: by default equals to user
      // replyTo: credentials.user,            // replyTo: by default undefined
      // bcc: 'kevin.miguta@inteligeninfosys.com',            // almost any option of `nodemailer` will be passed to it
      bcc: g_email,
      subject: title,
      // text: 'gmail-send example 1', // Plain text
      html: '<body style="overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#feffff">' +
        '<table cellspacing="0" cellpadding="0" width="100%" bgcolor="#feffff">' +
        '<tr>' +
        '<td style="FONT-SIZE: 0px; HEIGHT: 0px; LINE-HEIGHT: 0"></td>' +
        '</tr>' +
        '<tr>' +
        '<td valign="top">' +
        '<table class="rtable" style="WIDTH: 756px; MARGIN: 0px auto" cellspacing="0" cellpadding="0" width="756" align="center" border="0">' +
        '<tr>' +
        '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent">' +
        '<table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left">' +
        '<tr style="HEIGHT: 20px" height="20">' +
        '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent"></th>' +
        '</tr>' +
        '<tr style="HEIGHT: 94px" height="94">' +
        '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent">' +
        '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center">' +
        '<table class="imgtable" style="MARGIN: 0px auto" cellspacing="0" cellpadding="0" align="center" border="0">' +
        '<tr>' +
        '<td style="PADDING-BOTTOM: 2px; PADDING-TOP: 2px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px" align="center">' +
        '<table cellspacing="0" cellpadding="0" border="0">' +
        '<tr>' +
        '<td style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; BACKGROUND-COLOR: transparent"><a href="http://www.co-opbank.co.ke/" target="_blank"><img title="Co-operative Bank of Kenya" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="" src="cid:unique@kreata.ee" width="110" /></a></td>' +
        '</tr>' +
        '</table>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</tr>' +
        '</table>' +
        '</th>' +
        '</tr>' +
        '<tr>' +
        '<th class="contenttd" style="BORDER-TOP: #0e8706 5px solid; BORDER-RIGHT: medium none; WIDTH: 756px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff">' +
        '<table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left">' +
        '<tr style="HEIGHT: 348px" height="348">' +
        '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 10px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
        '<p style="FONT-SIZE: 24px; MARGIN-BOTTOM: 1em; FONT-FAMILY: geneve, arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #2d2d2d; TEXT-ALIGN: left; LINE-HEIGHT: 37px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left"><span style="FONT-SIZE: 16px; LINE-HEIGHT: 25px"><strong>Dear Customer</strong></span>,</p>' +
        '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">This is to remind you that your loan payment is over-due and the debt needs to be settled as per the borrowing terms. Attached here is the ' + title + '.<br />' +
        '&nbsp;<br />' +
        '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">For any queries, contact Collections Department on phone numbers: 0711049937/0711049195/0711049517</p>' +
        '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">Yours Faithfully,<br />' +
        '<br />' +
        '<strong>Head,</strong><br />' +
        '<strong>Collections Department,</strong><br />' +
        '<strong>Credit Management Division,</strong><br />' +
        '<strong>Co-operative Bank Of Kenya Ltd</strong><br />' +
        '</p>' +
        '<p style="FONT-SIZE: 10px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #7c7c7c; TEXT-ALIGN: left; LINE-HEIGHT: 12px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">This e-mail message has been scanned for <strong>Viruses and Content Scanned</strong></p>' +
        '</th>' +
        '</tr>' +
        '<tr style="HEIGHT: 150px" height="150">' +
        '<th class="contenttd" style="BORDER-TOP: #0e8706 1px solid; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 10px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
        '<p style="FONT-SIZE: 10px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #7c7c7c; TEXT-ALIGN: left; LINE-HEIGHT: 12px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left"><br />' +
        '&nbsp;<strong>DISCLAIMER:</strong> This email (including any attachments) is confidential and intended only for the use of the addressee. It may contain information covered by legal, professional or other privilege, which privilege is not lost or waived by reason of mistaken transmission thereof. Unless you are the intended recipient (or authorized to receive for the intended recipient), you may not read, print, retain, use, copy, distribute or disclose to anyone the message (including any attachments) or any information contained in the message. Any representation or opinions expressed are those of the individual sender and not necessarily those of Co-operative Bank Of Kenya. Internet communications are not secure or safe and therefore Co-operative Bank does not accept legal responsibility for the contents of this message. If you are not the addressee, please inform the sender immediately and destroy this e-mail (including any attachments). Although Co-operative Bank operates anti-virus programs, it does not accept responsibility for any damage whatsoever caused by any viruses passed by e-mail.</p>' +
        '</th>' +
        '</tr>' +
        '<tr style="HEIGHT: 84px" height="84">' +
        '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 30px; TEXT-ALIGN: left; PADDING-TOP: 10px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
        '<div style="PADDING-BOTTOM: 10px; TEXT-ALIGN: center; PADDING-TOP: 10px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px">' +
        '<table class="imgtable" style="DISPLAY: inline-block" cellspacing="0" cellpadding="0" border="0">' +
        '<tr>' +
        '<td style="PADDING-RIGHT: 5px"><a href="https://www.facebook.com/coopbankenya/" target="_blank"><img title="Facebook" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="Facebook" src="cid:unique@facebook_logo.ee" width="24" ></a> </td>' +
        '<td style="PADDING-RIGHT: 5px"><a href="https://twitter.com/coopbankenya/" target="_blank"><img title="Twitter" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="Twitter" src="cid:unique@twitter_logo.ee" width="24" ></a> </td>' +
        '<td><a href="https://wa.me/254736690101" target="_blank"><img title="Coopbankenya WhatsApp" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="" src="cid:unique@whatsapp_logo.ee" width="24"></a> </td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '</th>' +
        '</tr>' +
        '<tr>' +
        '<td style="FONT-SIZE: 0; HEIGHT: 8px; LINE-HEIGHT: 0">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '</th>' +
        '</tr></table></th></tr></table></td></tr></table>' +
        '</body>',
    });

    var filepath = msg.file; // File to attach

    send({
      subject: title, // Override value set as default
      bcc: g_email,
      // cc: g_email,
      attachments: [
        {
          filename: 'coopbank_logo.png',
          path: '/Users/kevinabongo/Projects/ecol_apis_v4/common/models/coopbank_logo.png',
          cid: 'unique@kreata.ee' //same cid value as in the html img src
        },
        {
          filename: 'facebook_logo.png',
          path: '/Users/kevinabongo/Projects/ecol_apis_v4/common/models/facebook_logo.png',
          cid: 'unique@facebook_logo.ee' //same cid value as in the html img src
        },
        {
          filename: 'twitter_logo.png',
          path: '/Users/kevinabongo/Projects/ecol_apis_v4/common/models/twitter_logo.png',
          cid: 'unique@twitter_logo.ee' //same cid value as in the html img src
        },
        {
          filename: 'whatsapp_logo.png',
          path: '/Users/kevinabongo/Projects/ecol_apis_v4/common/models/whatsapp_logo.png',
          cid: 'unique@whatsapp_logo.ee' //same cid value as in the html img src
        }
      ],
      files: [{
        filename: 'DemandNotice.pdf',
        path: filepath,
        // filename: 'Demand_Letter' + msg.file, // You can override filename in the attachment if needed
      }]
    }, function (err, response) {
      console.log('* [example 1.1] send() callback returned: err:', err, '; res:', response);
      if (err) {
        cb(null, 'failure', err);
      } else {
        cb(null, 'success');
      }
    });
  };

  EmailModel.remoteMethod('email', {
    accepts: {
      arg: 'msg', type: 'object', http: { source: 'body' }
    },

    returns: { arg: 'result', type: 'string' },
    http: { path: '/send', verb: 'post' }
  });
};