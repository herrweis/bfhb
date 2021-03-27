import React, { Component } from "react"
import Burger from "../Burger"
import * as styles from "./popup.module.scss"

class Popup extends Component {

  constructor(props) {
    super(props);
    this.rating = ["Nah", "Solid", "Ripper"]
    this.url = "https://google.com/maps/place/"+encodeURI(this.props.place.address);
  }

  renderFoodItem(item) {
    return (
      <div key={this.currentKey} className={styles.burger}>
        <span className={styles.label}>{item.name}:</span> <span className={styles.rating}>{this.rating[item.rating]}{[...Array(item.rating)].map((e, i) => <Burger />)}</span>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        <h3>{this.props.place.name}</h3>
        <a href={this.url}>
          <address>{this.props.place.address}</address>
        </a>
        <p>Burgers eaten:</p>
        {this.props.place.food.map(item => {
          return this.renderFoodItem(item)
        })}
      </div>
    )
  }
}

export default Popup
