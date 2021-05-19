export default {
  install(Vue, options) {
    Vue.prototype.isLt2M = function(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      return isLt2M
    }
    Vue.prototype.verifyScale = function(value) {
      const pattern = /^[0-9]+([.]\d{1,5})?$/
      return pattern.test(value)
    }
  },
  getUrlBase64(url) {
    return new Promise(resolve => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.crossOrigin = 'Anonymous' //允许跨域
      img.src = url
      console.log(img.src)
      img.onload = function() {
        canvas.height = 300
        canvas.width = 300
        ctx.drawImage(img, 0, 0, 300, 300)
        let dataURL = canvas.toDataURL('image/png')
        console.log(dataURL)
        canvas = null
        resolve(dataURL)
      }
    })
  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
}

// 将base64转换为file
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 时间戳=>时间
export function formatTime(number, format) {
  var formateArr = ['Y', 'm', 'd', 'H', 'i', 's']
  var returnArr = []

  var date = new Date(number)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))

  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}
// 格式化时间，如果是单数的话，就前面加个0
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 数字前面自动补零 num 传入的数字  n 几位
export function prefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}