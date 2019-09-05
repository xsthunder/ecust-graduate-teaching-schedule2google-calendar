const convert2  = require('teaching-event2google-calendar-event');
const CalendarAPI = require('node-google-calendar');
const calendarConfig = require('./calendar-config');
const fs = require('fs')
//const translateCousreName = require('./translateCourseName'); // 鸡肋，对应只有多媒体
const weekIndicator =
    Array.from({ length: 20 }).fill(null)
        .map((o, i) => {
            i++;
            return {
                name: `第${i}周`,
                teacher: '',
                period: `${i}-${i}(周)`,
                location: '',
                time: '1~2节',
                weekday: '星期一'
            }
        });
async function main() {
    let res = null;
    try {
        res = [...res, ...weekIndicator];
        res = await convert2(res);//'teaching-event2google-calendar-event'

        let cal = new CalendarAPI(calendarConfig);
        const calendarId = calendarConfig.calendarId;
        res.forEach(async (o) => {
            try {
                await cal.Events.insert(calendarId, o);
            } catch (err) {
                const d = new Date(o.start.dateTime)
                d.setHours(d.getHours() + 8);
                console.log(`failed insertint ${o.summary} ${d.getDay()} ${d.toLocaleDateString()} ${d.toLocaleTimeString()} ${err}`)
            }
        })
    } catch (err) {
        console.log('err on main', err);
    }
}
function masterTeachingEvent2teachingEvent(o){
    let period = `${o['起止周']}(周)`
    period.replace('-', '~')
    let time = o['上课时间1']
    time = time.slice(time.indexOf('/') + 1)
    let weekday = o['上课时间1']
    weekday = `星期${weekday[1]}`
    let description = Object.entries(o).reduce((p, c)=>{
        let [key, value ]= c;
        if(value === "")return p;
        key = key.replace('\n', '')
        if(p)p += '\n'
        p += `${key}:${value};`
        return p;
    }, '')
    return {
        name:o['课程名称'],
        teacher:o['上课教师'],
        period,
        location:o['上课教室1'],
        time,
        weekday,
        description
    }
}
async function dev() {
    let res = fs.readFileSync('./lessons/master-doctor.json');
    res = JSON.parse(res)
    try {
        res = res.slice(0, 1)
        res = res.map(masterTeachingEvent2teachingEvent)
        // res = [{ name: '企业EHS风险管理',
        //     teacher: '修光利',
        //     period: '2-8(周)',
        //     location: '七大',
        //     time: '11~12节',
        // weekday: '星期三' } ]
        console.log('before', res);
        res = convert2(res);
        res = res[0];
        // let cal = new CalendarAPI(calendarConfig);
        // const calendarId = calendarConfig.calendarId;
        // res = await cal.Events.insert(calendarId, res);
        console.log(res);
    } catch (err) {
        console.log('err on dev', err);
    }
}
dev();
// main();

// @see https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});