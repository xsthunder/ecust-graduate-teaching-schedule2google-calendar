const LOGIN_PAGE_TITLE = '华东理工大学综合教务管理系统-强智科技';
const HOME_PAGE_TITLE = 'http://inquiry.ecust.edu.cn/jsxsd/framework/xsMain.jsp';
function atHomePage(str) {
    return str === HOME_PAGE_TITLE;
}
function atLoginPage(str) {
    return str === LOGIN_PAGE_TITLE;
}
module.exports={
    atHomePage,
    atLoginPage,
}