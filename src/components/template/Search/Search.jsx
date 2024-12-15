import React, { useState } from 'react';
import './Search.css';
import Loading from '../../module/Loading/Loading';

function Search() {
  const [isLoading , setIsLoading] = useState(false);

  const handlerSearchCity = ()=>{
    setIsLoading(true);
  }

  return (
    <section className="search">
        <div className="container">
            <div className="box">
                <button className="search_btn" 
                onClick={handlerSearchCity}
                >Search</button>
                <button className="search_btn">Get Location</button>
                <input type="text" className="search_input" />
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