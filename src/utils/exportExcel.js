export function exportExcel(res, msg, format) {
  const fileName = msg + new Date().toLocaleDateString() + '.' + format
  const blob = new Blob([res.data])
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}
