import axios from 'axios'

const request = axios.create()

export function getSideData () {
  return request({
    url: '/api/side'
  })
}

function dateFormat () {
  // 将当前日期格式化为YYYYMMDD
  let date = new Date()
  let Y = date.getFullYear()
  let M = ('0' + (date.getMonth() + 1)).slice(-2)
  let D = ('0' + date.getDate()).slice(-2)
  return `${Y}${M}${D}`
}

export function getMarkdownFile (path) {
  return request({
    url: `/markdown/${path}?t=${dateFormat()}`
  })
}
