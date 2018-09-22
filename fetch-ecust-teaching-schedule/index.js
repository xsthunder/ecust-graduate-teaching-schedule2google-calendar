eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('b 9="o+/=";p q(a){b e="";b 8,5,7="";b f,g,c,1="";b i=0;m{8=a.h(i++);5=a.h(i++);7=a.h(i++);f=8>>2;g=((8&3)<<4)|(5>>4);c=((5&s)<<2)|(7>>6);1=7&t;k(j(5)){c=1=l}v k(j(7)){1=l}e=e+9.d(f)+9.d(g)+9.d(c)+9.d(1);8=5=7="";f=g=c=1=""}u(i<a.n);r e}',32,32,'|enc4||||chr2||chr3|chr1|keyStr|input|var|enc3|charAt|output|enc1|enc2|charCodeAt||isNaN|if|64|do|length|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|function|encodeInp|return|15|63|while|else'.split('|'),0,{}))
const fs = require('fs')
const path = require('path')
const readline = require('readline2');
const getCookie = require('./util/getCookie');
// TODO support multiply jar
const got = require('got');
const pify = require('pify');
const {atHomePage}= require('./util/where');
const config = require(path.resolve('./config'));
const {TEMP_FILE_NAME} = config;
async function main(){
    let cookieJar = null;
    cookieJar= await getCookie();
    res = await got.stream('http://inquiry.ecust.edu.cn/jsxsd/verifycode.servlet', {cookieJar}).pipe(fs.createWriteStream('randomcode.jpg'));
    const RANDOMCODE= await getRandomCodeAnswer();
    res = await login(cookieJar, RANDOMCODE)
    return await got.get('http://inquiry.ecust.edu.cn/jsxsd/xskb/xskb_list.do',{cookieJar})
}


function login(cookieJar, RANDOMCODE){
    let {
        account,
        passwd,
    } = config;
    account = encodeInp(account);
    passwd = encodeInp(passwd)
    const encoded = account+"%%%"+passwd;
    return new Promise(function (resolve, reject) {
        got.post('http://inquiry.ecust.edu.cn/jsxsd/xk/LoginToXk', {
            form: true,
            body: {
                encoded,
                RANDOMCODE
            },
            cookieJar,
        }).then(res=>reject(res), err=>(atHomePage(err.headers.location)?resolve(err):reject(err)))
    })
}

function getRandomCodeAnswer() {
    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise(function (resolve, reject) {
        r.question('what are the randomcode?',
            function (ans) {
                r.close();
                resolve(ans.trim());
            });
    })
}
 /**
  * @description login, saved teaching schedule page as temp.html
  * @returns temp.html's content as string for jsdom
  */
 async function wrap(){
    let res = null
    try{
        res = await  pify(fs.readFile)(TEMP_FILE_NAME, { encoding: 'utf-8' });
        console.info('use perseved data');
        return res;
    }catch(err){
        console.info('try fetch new data');
    }
    try {
        res = await main();
    } catch (err) {
        throw(err);
    }
    if (!res) throw new Error("can not get data in fetch-ecust-teaching schedule")
    res = res.body;
    //console.log(JSON.stringify(res))
    try {
        await pify(fs.writeFile)(TEMP_FILE_NAME, res, { encoding: 'utf-8' });
    } catch (err) {
        console.warn("failed in saving data")
    }
    return res;
}
module.exports =wrap;

