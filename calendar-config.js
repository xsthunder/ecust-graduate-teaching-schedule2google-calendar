
const path = require('path');;
const secret = require(path.resolve('./calendar-secret.json'));
const key = secret.private_key;
const serviceAcctId = secret.client_email;
const {calendarId,timezone }= require('./config.js');
module.exports = {
    key,
    serviceAcctId,
    calendarId,
    timezone,
}