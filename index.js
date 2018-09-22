const fetch = require('fetch-ecust-teaching-schedule');
const convert1 = require('ecust-teaching-schedule2teaching-events');
const convert2  = require('teaching-event2google-calendar-event');
const CalendarAPI = require('node-google-calendar');
const calendarConfig = require('./calendar-config');
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
        res = await fetch();// 'fetch-ecust-teaching-schedule' html
        res = await convert1(res);//ecust-teaching-schedule2teaching-events'
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
async function dev() {
    let res = null;
    try {
        //res = await fetch();// 'fetch-ecust-teaching-schedule' html
        //res = await convert1(res);//ecust-teaching-schedule2teaching-events'
        /*
         *  [{ name: '企业EHS风险管理',
         *      teacher: '修光利',
         *      period: '2-8(周)',
         *      location: '七大',
         *      time: '11~12节',
         *  weekday: '星期三' } ]
        **/
        //res = await convert2(res);
        res = convert2([{
            name: '嵌入式系统',
            teacher: '修光利',
            period: '2-8(周)',
            location: '七大',
            time: '11~12节',
            weekday: '星期三'
        }]);
        res = res[0];
        let cal = new CalendarAPI(calendarConfig);
        const calendarId = calendarConfig.calendarId;
        res = await cal.Events.insert(calendarId, res);
        console.log(res);
    } catch (err) {
        console.log('err on dev', err);
    }
}
//dev();
main();

// @see https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});