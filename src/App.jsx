import React from 'react'
import Axios from 'axios'

import LocationForm from './components/module_form'
import WeatherDays from './components/weather_update'
import imgSelection from './components/imgs'
import config from './config'

function App() {
  const [city, setCity] = React.useState({
    name: '',
    lon: 0,
    lat: 0
  })
  const [allWeather, setAllWeather] = React.useState([])
  const [curWeather, setCurWeather] = React.useState({})
  const [fourDaysWeather, setFourDaysWeather] = React.useState([])
  const [warning, setWarning] = React.useState(false)
  const [inputState, setInputState] = React.useState('')
  const [curImg, setCurImg] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const getGeoFromInput = (inputState) => {
    if (inputState !== city.name) {
      const request = Axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${inputState}&appid=${config.key}`)
      request
        .then((res) => {
          setCity({
            name: res.data[0].name,
            lon: res.data[0].lon,
            lat: res.data[0].lat
          })
          setWarning(false)
          setInputState('')
        })
        .catch((error) => setWarning(true))
    }
  }

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const request = Axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${config.key}`)
        request.then((res) => {
          setCity({
            name: res.data[0].name,
            lon: lon,
            lat: lat
          })
        })
      })
    }
    else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const getAllWeather = () => {
    const request = Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${config.key}`)
    request
      .then((res) => {
        setAllWeather(res.data.list)
      }).catch(error => alert(`Weather not found (${error})`))
  }

  const getCurrentWeather = () => {
    if (city.name !== '') {
      const curDate = Date.now()
      for (let i = 0; i < allWeather.length - 1; i++) {
        const weatherDt = Date.parse(allWeather[i].dt_txt)
        const weatherDtNext = Date.parse(allWeather[i + 1].dt_txt)
        if (curDate >= weatherDt && curDate < weatherDtNext) {
          setCurWeather(allWeather[i])
        }
      }
    }
  }

  const getFourDaysWeather = () => {
    const fourDaysArray = []
    if (city.name !== '') {
      for (let i = 8; i < allWeather.length - 1; i += 8) {
        fourDaysArray.push(allWeather[i])
        setFourDaysWeather(fourDaysArray)
      }
    }
  }

  React.useEffect(() => {
    if (city.name === '') {
      return
    } else {
      getAllWeather()
    }
  }, [city])

  React.useEffect(() => {
    getCurrentWeather()
    getFourDaysWeather()
  }, [allWeather])

  React.useEffect(() => {
    setCurImg(imgSelection(curWeather))
  }, [curWeather])

  return (
    <div className="App">
      <div className="container">
        <div className="right">

          <LocationForm
            inputState={inputState}
            setInputState={setInputState}
            getGeoFromInput={getGeoFromInput}
            warning={warning}
            getCurrentPosition={getCurrentPosition} />

        </div>
        <div className="left">
          <img
            src={curImg}
            alt="background image"
            className="leftBg"
          />
          {<WeatherDays currentWeather={curWeather} fourDaysWeather={fourDaysWeather} city={city.name} />}
        </div>
      </div>
    </div>
  );
}

export default App;