const cookies = require('js-cookie')

module.exports = {
  /**
   * 获取 csrftoken
   * @return {String} 32 位的 token
   */
  getCSRFToken() {
    var csrftoken = cookies.get('csrftoken')
    return csrftoken
  },

  formatDate(date, type) {
    if (!date) return false
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const hour = newDate.getHours()
    const minute = newDate.getMinutes()
    const second = newDate.getSeconds()
    const fn = v => v > 9 ? v : `0${v}`

    switch (type) {
      case 'YYYY-MM-DD':
        return `${year}-${fn(month)}-${fn(day)}`
      case 'YYYY/MM/DD':
        return `${year}/${fn(month)}/${fn(day)}`
      case 'YYYY-MM-DD HH:MM:SS':
        return `${year}-${fn(month)}-${fn(day)} ${fn(hour)}:${fn(minute)}:${fn(second)}`
      case 'YYYY.MM.DD':
        return `${year}.${fn(month)}.${fn(day)}`
      case 'YYYY.MM.DD HH:MM:SS':
        return `${year}.${fn(month)}.${fn(day)} ${fn(hour)}:${fn(minute)}:${fn(second)}`
      case 'MM.DD':
        return `${fn(month)}.${fn(day)}`
      case 'YYYY.MM':
        return `${year}年${fn(month)}月`
      default:
        return `${year}年${fn(month)}月${fn(day)}日`
    }
  },

  sessionStorage: {
    set(key, value) {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    },

    get(key) {
      let value = window.sessionStorage.getItem(key)
      return JSON.parse(value)
    },

    clearOne(key) {
      window.sessionStorage.removeItem(key)
    },

    clearAll() {
      window.sessionStorage.clear()
    },
  },
  
}
