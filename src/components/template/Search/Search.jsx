import React, { useState } from 'react';
import './Search.css';
import Loading from '../../module/Loading/Loading';
import swal from 'sweetalert';

function Search() {
  const [isLoading , setIsLoading] = useState(false);
  const [city , setCity] = useState("");
  const key_api = "e71388857ca1f6798e51fed62c6c3a39";

  const handlerSearchCity = async ()=>{
    setIsLoading(true);
    const res = await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key_api}&units=metric`)
    if(res.status === 200){
      const weatherData = await res.json();
      const {lat , lon} =weatherData
      localStorage.setItem("weatherData", JSON.stringify(weatherData))

      const forecast = await fetch( `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key_api}&units=metric`)
      if(forecast.status === 200 ){
        const forecastData = await res.json();
        localStorage.setItem("forecastData" , JSON.stringify(forecastData))
        setIsLoading(false);
      }
      }else{
        setIsLoading(false)
        swal({
          title:"This city does not exist",
          icon:"error",
          buttons:"try again",
        })
    }
    // console.log(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`)
  }

  return (
    <section className="search">
        <div className="container">
            <div className="box">
                <button className="search_btn" 
                onClick={handlerSearchCity}
                >Search</button>
                <button className="search_btn">Get Location</button>
                <input type="text" className="search_input"
                value={city}
                onChange={e=>setCity(e.target.value)}
                />
            </div>
        </div>
        {isLoading && (
          <div className="shadow">
              <Loading/>
          </div>
        )}
    </section>
  )
}

export default Search