var day = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
var month = ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек']
var date = new Date()

function formatDate() {
  return `${day[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]}`
}

function nextDate() {
  return `${day[date.getDay()]} ${date.getDate() + 1} ${month[date.getMonth()]}`
}

export {formatDate,nextDate}