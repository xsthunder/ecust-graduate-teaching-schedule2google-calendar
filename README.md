# usage 

1. install and run SSTrap or other method makes you get access to google

2. edit `passwd` `account`at config.js

3. edit `calendarId` at config.js, your can get it from google your specified calendar setting. It's recommanded to create a new calendar.

4. [follow constuctions to setup your google calendar](https://github.com/yuhong90/node-google-calendar/wiki#preparations-needed), download `calendar-secret.json` from api console which is requred by `calendar-config.js`

5. `npm start`

```
randomcode.jpg //change when temp.html not existed, you have to see it, and enter it properly to login
temp.html // temporily saved page of ecust teaching schedule, avoid frequency login in. If it existed, it will be read and returned directly from fetch-ecust-teaching-schedule without loginning
```

# workflow

1. `fetch-ecust-teaching-schedule` login, saved teaching schedule page as temp.html and return.
2. `teaching-schedule2teaching-events` temp.html to [teaching events]
3. `teaching-event2google-event` [teaching events] to [google event]

## optional
`tranlateCourseNamae` coursename cn -> en for voicecasting in google asist.

# TODO

1. add 单双周 support
2. complete index.html, add google calendar web service at google api console, for case that can't access goolge from console
3. save genrated events at index.js for TODO#2
4. 
