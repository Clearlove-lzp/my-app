
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
Date.Diff = function (start, end, fmt) {
  var time = end.getTime() - start.getTime();
  var day = time / (1000 * 3600 * 24);
  var hour = (time % (1000 * 3600 * 24)) / (3600 * 1000);
  var min = (time % (1000 * 3600)) / (60 * 1000);
  var sec = (time % (1000 * 60)) / 1000;
  var o = {
    "d+": parseInt(day), //日
    "h+": parseInt(hour), //小时
    "m+": parseInt(min), //分
    "s+": parseInt(sec), //秒
  };

  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

