import React from 'react';
import './Search.css';

function Search() {
  return (
    <section className="search">
        <div className="container">
            <div className="box">
                <button className="search_btn">Search</button>
                <button className="search_btn">Get Location</button>
                <input type="text" className="search_input" />
            </div>
        </div>
    </section>
  )
}

export default Search