const arr = require('./CourseNameTranslationTable.json');
// @see https://gist.github.com/cbdavide/97100ac68e1f3699274b38a3d6bde7ba
var binarySearch = function (value) {
    const array = arr;
    var guess,
        min = 0,
        max = array.length - 1;
    const len = value.length;
    while (min <= max) {
        guess = Math.floor((min + max) / 2);
        if (array[guess].substr(0, len) === value){
            return array[guess].substr(len).trim();
        }
        else if (array[guess] < value)
            min = guess + 1;
        else
            max = guess - 1;
    }
    return value
}
function fn(name) {
    return binarySearch(name);
}
module.exports = fn;
