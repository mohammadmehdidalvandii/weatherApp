import React from 'react';
import './Loading.css'

function Loading() {
  return (
   <section className="loading">       
            <div className="loading_content">
                <h1 className="loading_title">Under review</h1>
                <p className="loading_text">Please be patient</p>
                <span className="loader"></span>
            </div>
   </section>
  )
}

export default Loading