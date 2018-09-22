

const jsdom = require('jsdom');
const {JSDOM} = jsdom;
function converCol(c){
    const ccs = c.childNodes;
    if(ccs.length !== 9)return null;
    let cs = ccs[5].childNodes; // display content
    let op = ccs[7].childNodes; // hide content
    if(op.length !== 8)return null;
    if(cs.length !== 6)return null;
    // use textContent instead of innerText @see https://github.com/jsdom/jsdom/issues/1245
    let teacher = null, name = null, period = null, location = null;
    if(op[2])teacher =  op[2].textContent.trim() // 过弋
    else return null;
    if(cs[0]&&cs[2]&&cs[4])(name = cs[0].textContent.trim(), period = cs[2].textContent.trim(), location = cs[4].textContent.trim());// 计算机英语 1-9(周) 四201
    else return null;
    return {
        name,
        teacher,
        period,
        location
    }
}

function converRow(r,weekdays){
    const cs = Array.from(r.childNodes);
    if(!cs.length)return null;
    let time = cs[1].textContent.trim();
    return cs.reduce((p, c, i) => {
        let ans = converCol(c);
        let weekday = weekdays[i];
        if(ans && weekday){
            p.push({...ans, time, weekday});
        }
        return p;
    }, [])
}
/**
 * @param  {string} str for teaching schedule's html page as string
 * @returns array of self defined teaching events, each contains {name, teacher, period, location}
 */
function main(str) {
    const broswer = new JSDOM(str);
    const document = broswer.window.document;
    let ts = document.getElementById('kbtable').childNodes[1];
    let ans = [];
    let tss = Array.from(ts.childNodes);
    ans = tss.reduce((p, o, i) => { 
        let weekdays= Array.from(tss[0].childNodes).map(o=>o.textContent.trim());
        let ans = converRow(o,weekdays);
        if(ans)return [...p, ...ans];
        return p;
     }, []);
     return ans;
}
module.exports = main;