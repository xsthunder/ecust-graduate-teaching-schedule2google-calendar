const { periodOffset, setD, weekdayOffset, timeOffsets } = require("./util");

/*
* TODO add 单双周
*/
const fs = require('fs');
const path = require('path');
/**
 * @param  {object} e teaching event object or Array<teaching event>
 * @returns google event or Array<goolge event>
 * @see https://developers.google.com/calendar/v3/reference/events
 */
function warpper(e) {
    
    if (e instanceof Array) {
        return e.map((o,i)=>{
            try{
                return main(o);
            }
            catch(e){
                console.warn('err in teachingEvent2googleEvent', i, o);
                throw(e)
            }
        });
    }
    else return main(e);
}


/**
 * @param  Date dateTime
 * @returns {     
 * "start": { "timeZone": "Etc/Universal", "dateTime": "2017-02-23T05:30:00+00:00" }, 
 * "end": { "timeZone": "Etc/Universal", "dateTime": "2017-02-23T07:10:00+00:00" }
 * }
 */
function startAndEnd(dateTime, timeOffsets){
    function f( timeOffset){
        let d = new Date( + dateTime + + timeOffset)
        d = d.toISOString();
        d = d.substr(0, d.length - 5);
        return {
            "timeZone": "Etc/Universal", 
            "dateTime": d
        }
    }
    return {
        "start":f(timeOffsets[0]),
        "end":f(timeOffsets[1])
    }
}
function main(o) {
    const config = require(path.resolve('./config'));
    const {termStartdateOnMonday} = config;
    const periods = (periodOffset(o.period));
    let dateTime = new Date( 
        //学期开始周一
        +termStartdateOnMonday + 
        //2~8周
        +setD(periods[0]*7) + 
        //星期三
        +weekdayOffset(o.weekday));

    let interval = 1;
    let recurrence = new Date(
        +termStartdateOnMonday + 
        +setD(periods[1]*7) +
        +weekdayOffset(o.weekday) +
        // avoid calculate the timeOffsets[1], until={{day}} is exclusive, avoid overlapping
        +setD(3))
    recurrence = (recurrence.toISOString())
	recurrence = recurrence.substr(0,recurrence.length-14);
    recurrence = "RRULE:FREQ=WEEKLY;UNTIL="+recurrence.replace(/-/g,"")+";INTERVAL="+interval;
    recurrence = [recurrence]
    // google event schema @see https://developers.google.com/calendar/v3/reference/events
    return{
        "colorId": "5",
        "summary": `${o.location}/${o.name}`,
        "location": o.location,
        "description":o.description?o.description:`教师:${o.teacher}`,
        ...startAndEnd(dateTime, timeOffsets(o.time, o.weekday) ),
        recurrence
    }
}
module.exports = warpper;

/* schema
  {
    "colorId": "5",
    "summary": "中国文化导论1学分36",
    "location": "A305",
    "description": "教师:吴思增,开课系:文化素质教育中心,学分:1.0,课程性质:公共基础课,课程号:1623015301",
    "start": {
      "timeZone": "Etc/Universal",
      "dateTime": "2017-02-23T05:30:00+00:00"
    },
    "end": {
      "timeZone": "Etc/Universal",
      "dateTime": "2017-02-23T07:10:00+00:00"
    },
    "recurrence": [
      "RRULE:FREQ=WEEKLY;UNTIL=20170420;INTERVAL=1"
    ]
  },
  */