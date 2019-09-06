const fs = require('fs')
const path = require('path')
function setHM(h, m) {
    const d = new Date(0);
    d.setUTCHours(h);
    d.setUTCMinutes(m);
    return d;
}
/**
 * @param Number day
 * @returns Date Object d, +d is the offset of day
 */
function setD(day) {
    const d = new Date(0);
    d.setUTCDate(day + 1); //需要加1，位移1天，则需要讲日期设置为 0102 而不是0101位移为0
    return d;
}
exports.setD = setD;
/**
 * @param  string period
 * @returns [number,number] '2-8(周)'  -> [1,7]
 */
function periodOffset(period) {
    const r = /(\d+)-(\d+)/;
    const res = r.exec(period);
    let ans = [res[1], res[2]];
    ans = ans.map(o => Number.parseInt(o));
    ans = ans.map(o => (o - 1));
    return ans;
}
exports.periodOffset = periodOffset;
/**
 * @param  string weekday
 * @return '星期一' -> new Date(0)
 */
function weekdayOffset(weekday) {
    function getWeekdayOffset(s) {
        const ans = '一二三四五六日'.indexOf(s);
        if (ans < 0)
            throw new Error('invalid input');
        return ans;
    }
    return setD(getWeekdayOffset(weekday[2]));
}
exports.weekdayOffset = weekdayOffset;
/**
 * @param  string time
 * @returns '11~12节', ->[ 1970-01-01T19:50:00.000Z, 1970-01-01T21:30:00.000Z ]
 */

const timeinfo = require('../timeinfo/timeinfo.json')
const buildDayInfo = (arr)=>{
    return arr.reduce((p, c)=>{
        const [key, start, end] = c;
        p[key] = {start, end}
        return p
    }, {})
}
function timeOffsets(time, weekday ) {
    function startDateTime(i, weekday, key) {
        let dayinfo = null
        if(weekday.indexOf('六') > 0 || weekday.indexOf('日') > 0){
            dayinfo = timeinfo['weekend']
        }
        else{
            dayinfo = timeinfo['weekday']
        }
        dayinfo = buildDayInfo(dayinfo)
        let ret = dayinfo[i][key];
        let [h,m] = ret.split(':')
        h = Number.parseInt(h)
        m = Number.parseInt(m)
        ret = setHM(h,m)
        return ret
    }
    const [startIndex, endIndex] = time.split('-')
    const start = startDateTime(startIndex, weekday, 'start');
    const end =  startDateTime(endIndex, weekday, 'end');
    return [start, end];
}
if(!module.parent){
    console.log(
        ['9-12', '星期一'], timeOffsets('9-12', '星期一'),
        ['9-12', '星期日'], timeOffsets('9-12', '星期日'),
    )
}
exports.timeOffsets = timeOffsets;