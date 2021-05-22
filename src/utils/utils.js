/**
 * 格式化时间
 * @param number 时间戳
 * @param format 格式
 * return boolean
 */
 export function formatTime(number, format) {
	if (number === null || number === undefined) {
		return '';
	}
	var formateArr = ['Y', 'm', 'd', 'H', 'i', 's'];
	var returnArr = [];

	// var date = new Date(number * 1000);
	var date = new Date(number);
	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));

	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}

	return format;
}