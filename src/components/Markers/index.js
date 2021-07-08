import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import Popup from "../Popup"
import { renderToString } from 'react-dom/server'
import * as styles from "./marker.module.scss"

const Marker = ({ map, place }) => {
  const markerRef = useRef()
  const markerSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.01 42.65"><path class="cls-1" d="M15.63,0C23.92,0,30,6.31,30,14.6v.47C30,26,20.6,39.49,15.38,42.65h-.12C10,39.49,0,26,0,15.07V14.6A14.67,14.67,0,0,1,15,0Z"/></svg>';
  const markerElement = document.createElement('div');
  markerElement.innerHTML = markerSVG;
  markerElement.className = styles.marker;
  markerElement.key = place.name;
  const PopupHTML = renderToString(<Popup place={place} />);

  useEffect(() => {
    const marker = new mapboxgl.Marker({ element: markerElement})
      .setLngLat([place.longitude, place.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(PopupHTML))
      .addTo(map)

    return () => marker.remove()
  })

  return <div ref={markerRef} />
}

const Markers = ({ map, places }) => {
  return (
    <>
      {places &&
        places.map(place => (
          <Marker key={place.name} map={map} place={place} />
        ))}
    </>
  )
}

export default Markers
