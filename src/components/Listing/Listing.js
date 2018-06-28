import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Item from './Item';
import styles from './styles.module.css'

export class Listing extends React.Component {
  render() {
    let home = "Toronto, Ontario"
    let origin = this.props.home
    let types = ["locality", "political"];

    if (origin){
      home = origin.formatted_address
      types = origin.types
    }
    return (
      <div className={classnames(styles.container)}>
        <div className={styles.itemContainer}>
          <h1>{home}</h1>
          { types.map(type => {
            return(
              <p key={type} >{type}</p>
            )
          })}
        </div>
      {
        this.props.places.map(place => {
        return (
          <Item 
          place={place}
          onClick={this.props.onClick}
          key={place.id} 
          directions={this.props.directions}
          />
        )
      })}
      </div>
    )
  }
}

export default Listing