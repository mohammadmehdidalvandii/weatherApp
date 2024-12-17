import React, { useEffect, useState } from 'react';
import './Weather.css'
import { MdDeleteForever } from 'react-icons/md'
import swal from 'sweetalert';

function Weather() {
    const [weatherData , setWeatherData] = useState(null);
    const [forecastData , setForecastData] = useState(null);
    const [currentTime, setCurrentTime] = useState(''); 
    const [currentDate, setCurrentDate] = useState('');

    // Removed handler City 
    const handlerRemovedCity = ()=>{
        swal({
            title:"Are you sure to remove the city?",
            icon:"error",
            buttons:["no","yes"]
        }).then((result)=>{
            if(result){
                localStorage.clear("weatherData");
                localStorage.clear("forecastData");
                window.location.reload()
            }
        })
    }

    // UseEffect get weather data 
    useEffect(()=>{
        const dataWeather = localStorage.getItem("weatherData");
        if(dataWeather){
            setWeatherData(JSON.parse(dataWeather))
        }
        const dataForecast = localStorage.getItem("forecastData")
        if(dataForecast){
            setForecastData(JSON.parse(dataForecast))
        }
    },[])

    // Update the current time and date every second
    useEffect(()=>{
              const intervalId = setInterval(() => {
                const now = new Date();
                setCurrentTime(now.toLocaleTimeString());
                setCurrentDate(now.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
            }, 1000);
    
            // Clear the interval on component unmount
            return () => clearInterval(intervalId);
    },[])

  return (
   <section className="weather">
        <div className="container">
            <div className="box box_weather">
                {weatherData ?(
                        <>
                                    <span className="weather_removed"
                        onClick={handlerRemovedCity}
                    >
                        <MdDeleteForever/>
                    </span>
                <div className="weather_wrapper">
                    <div className="weather_info">
                        <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`} alt="" className="weather_info_img" />
                        <div className="weather_info_content">
                            <span className="weather_info_city">{weatherData?.name}</span>
                            <span className="weather_info_city">country: {weatherData?.sys?.country}</span>
                            <span className="weather_info_sky">{weatherData?.weather[0].description}</span>
                            <span className="weather_info_temp">{weatherData?.main?.temp}°</span>
                        </div>
                    </div>
                    <div className="weather_content">
                        <ul className="weather_items">
                            <li className="weather_item">
                                <img src="/assets/images/rain.svg" alt="" className="weather_item_img" />
                                <span className="weather_item_text">humidity:</span>
                                <span className="weather_item_text">{weatherData?.main?.humidity}%</span>
                            </li>
                            <li className="weather_item">
                                <img src="/assets/images/wind.svg" alt="" className="weather_item_img" />
                                <span className="weather_item_text">wind:</span>
                                <span className="weather_item_text">{weatherData?.wind?.speed} km</span>
                            </li>
                          
                        </ul>
                        <ul className="weather_items">
                            <li className="weather_item">
                                <img src="/assets/images/mit.svg" alt="" className="weather_item_img" />
                                <span className="weather_item_text">Temp-min:</span>
                                <span className="weather_item_text">{weatherData?.main?.temp_min}°</span>
                            </li>
                            <li className="weather_item">
                                <img src="/assets/images/mxt.svg" alt="" className="weather_item_img" />
                                <span className="weather_item_text">Temp-max:</span>
                                <span className="weather_item_text">{weatherData?.main?.temp_max}°</span>
                            </li>
                        </ul>
                    </div>
                    <div className="weather_days_dateTime">
                        <div className="weather_dateTime">
                            <span className="date">{currentDate}</span>
                            <span className="time">{currentTime}</span>
                        </div>
                        <div className="weather_days">
                            {forecastData?.list.slice(0,8).map((item, index)=>(
                            <div className="days_item" key={index}>
                                <span className="days_item_sky">{item?.weather[0].description}</span>
                                <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`} alt="" className="days_item_img" />
                                <span className="days_item_time">{new Date(item.dt * 1000).toLocaleTimeString(["es-US"], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                        </>
                ) :(
                    <h2 className="weather_error">Currently there is no city</h2>
                )}
            </div>
        </div>
    </section>
  
  )
}

export default Weather