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
function timeOffsets(time) {
    function startDateTime(i) {
        switch (i) {
            case 1: return setHM(8, 0);
            case 3: return setHM(9, 55);
            case 5: return setHM(13, 30);
            case 7: return setHM(15, 25);
            case 9: return setHM(18, 0);
            case 11: return setHM(19, 50);
        }
        throw new Error('invalid input');
    }
    const rg = /(\d+)/;
    const n = rg.exec(time);
    const start = startDateTime((Number.parseInt(n[1])));
    const end = new Date(+start + +setHM(1, 40));
    return [start, end];
}
exports.timeOffsets = timeOffsets;