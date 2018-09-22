const path = require('path')
const timezone = 'UTC+08:00';
module.exports = {
    "TEMP_FILE_NAME":path.resolve(__dirname, 'temp.html'),
    "termStartdateOnMonday": new Date('2018-09-10T00:00:00'),
    "calendarId": "",
    "account":'',
    "passwd":"",
    timezone,
}
