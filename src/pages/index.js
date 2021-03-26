import React from "react"
import { Helmet } from "react-helmet"
import Logo from "../components/Logo"
import Map from "../components/Map"

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Burgers for Hills Bogans</title>
        <link rel="canonical" href="https://burgersforhillsbogans.com" />
      </Helmet>
      <Map />
      <Logo />
    </div>
  )
}
