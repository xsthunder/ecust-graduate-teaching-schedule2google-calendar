# usage 

1. install and run SSTrap or other method makes you get access to google

2. [follow constuctions to setup your google calendar](https://github.com/yuhong90/node-google-calendar/wiki#preparations-needed), download Credentials and rename it to `calendar-secret.json` which is requred by `calendar-config.js` at [api console/Credentials/ Create credentials / Service account key ](https://console.developers.google.com/apis/dashboard).

3. edit `calendarId` at config.js, in my case it's `hquf9lap6st1p9cgv5grtomjik@group.calendar.google.com`, you can get it from google your specified calendar setting. It's recommanded to create a new calendar. **add the admin account** which can be find in `calendar-secret/client_email` to `share with others` in the calendar's setting and set the modifying privilege.

4. install nodejs > 10

5. use [lessons/export-json.js](lessons/export-json.js) to extract lesson information. Use the json at [https://github.com/xsthunder/ecust-graduate-teaching-schedule2google-calendar/blob/master/index.js#L20](https://github.com/xsthunder/ecust-graduate-teaching-schedule2google-calendar/blob/master/index.js#L20)

6. `npm start`


## results
first year of master doctor program in 2019 fall in ecust. see
[don't need to login](https://calendar.google.com/calendar/embed?src=hquf9lap6st1p9cgv5grtomjik%40group.calendar.google.com&ctz=Asia%2FShanghai) or [need to login google](https://calendar.google.com/calendar?cid=aHF1ZjlsYXA2c3QxcDljZ3Y1Z3J0b21qaWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)
