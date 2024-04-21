import sunny from '../assets/img/sunny.jpg'
import cloud from '../assets/img/cloud.jpg'
import rain from '../assets/img/rain.jpeg'
import drizzle from '../assets/img/drizzle.jpg'
import fog from '../assets/img/fog.jpg'
import snow from '../assets/img/snow.jpg'
import storm from '../assets/img/storm.jpg'

const wheather_img = [sunny, cloud, rain, drizzle, fog, snow, storm]

export default function imgSelection(weatherData) {
  if (Object.keys(weatherData).length) {
    switch (weatherData.weather[0].main) {
      case 'Clear':
        return wheather_img[0]
        break
      case 'Clouds':
        return wheather_img[1]
        break
      case 'Rain':
        return wheather_img[2]
        break
      case 'Drizzle':
        return wheather_img[3]
        break
      case 'Fog':
        return wheather_img[4]
        break
      case 'Snow':
        return wheather_img[5]
        break
      case 'Thunderstorm':
        return wheather_img[6]
        break
    }
  }
   
  else {
    return wheather_img[0]
  }

}