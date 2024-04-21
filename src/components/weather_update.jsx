import {formatDate,nextDate} from './date'
function WeatherDays({ currentWeather, fourDaysWeather, city }) {
  const temp = Object.keys(currentWeather).length ? Math.round(currentWeather.main.temp) : ''
  const date = formatDate()
  const nextdate = nextDate();
  return (
    <div className="weatherDays">
      <div className="weatherDays__city">{city}</div>
      <ul className="daysList">
        {Object.keys(currentWeather).length
          ?
          <li className="daysItem daysItem-today">
            <div className="daysItem__date">{date}</div>
            <div className="daysItem__temp">{temp}</div>
          </li>
          : ''
        }
        {
          fourDaysWeather.map((obj, index) => {
            return <li key={index} className='daysItem'>
              <div className="daysItem__date">{nextdate}</div>
              <div className="daysItem__temp">{Math.round(obj.main.temp)}</div>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default WeatherDays