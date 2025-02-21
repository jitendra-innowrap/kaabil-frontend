'use client'
import React from 'react'
import GoogleMapReact from 'google-map-react';

export default function Map({lat,lng}:{lat:string,lng:string}) {

  return (        
    <div className="mapouter"><div className="gmap_canvas"><iframe className="gmap_iframe" width="100%" height="100%" src={`https://maps.google.com/maps?width=600&height=200&hl=en&q=${lat},${lng}&t=&z=14&ie=UTF8&iwloc=B&output=embed`} /><a href="https://sprunkin.com/">Sprunki</a></div><style dangerouslySetInnerHTML={{__html: ".mapouter{position:relative;text-align:right;width:100%;height:200px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:200px;}.gmap_iframe {height:200px!important;}" }} /></div>
  )
}
