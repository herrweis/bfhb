import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"
import bbox from "@turf/bbox"
import { multiPoint } from "@turf/helpers"
import PlacesData from "../../data/Places.json"
import Markers from "../Markers"
import "mapbox-gl/dist/mapbox-gl.css"
import * as styles from "./map.module.scss"

const MAPBOX_TOKEN = "pk.eyJ1IjoiYW5kaXdlaXMiLCJhIjoiY2ttcXQxcWlyMDE2YTJ4cnM1ZDk4bDNqZiJ9.ChCd1RiLVDOiipeZnGWLwA"
const places = PlacesData.burger;

const Map = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_TOKEN,
      style: "mapbox://styles/andiweis/ckmpchs8yr78f17qs5ec6m2jn",
      center: [145.340520, -37.890222],
      zoom: 13,
    })
    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    setMap(map)

    return () => map.remove()
  }, [])

  useEffect(() => {
    if (!map) return

    if (places.length !== 0) {
      const coords = []
      places.forEach(place => {
        coords.push([place.longitude, place.latitude])
      })
      const feature = multiPoint(coords)
      const box = bbox(feature)

      map.fitBounds(
        [
          [box[0], box[1]],
          [box[2], box[3]],
        ],
        {
          padding: 150,
          maxZoom: 13,
          duration: 2000,
        }
      )
    } else {
      map.easeTo({
        center: [145.340520, -37.890222],
        zoom: 13,
        duration: 2000,
      })
    }
  }, [map])

  return (
    <div ref={mapContainerRef} className={styles.container}>
      {places && map && <Markers map={map} places={places} />}
    </div>
  )
}

export default Map
