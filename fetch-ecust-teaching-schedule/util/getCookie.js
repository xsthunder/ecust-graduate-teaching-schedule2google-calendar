const Cookie = require('tough-cookie')
const got = require('got');
const contants = require('./constants.json')
module.exports =
    async () => {
        const res = await got.get('http://inquiry.ecust.edu.cn/jsxsd/')
        setCookie = res.headers['set-cookie'];
        const cookieJar = new Cookie.CookieJar();
        if (!setCookie instanceof Array) setCookie = [setCookie];
        setCookie.forEach(o => cookieJar.setCookieSync(o.split(';')[0].trim(), contants.host))
        return cookieJar;
    }