import React, { PropTypes as T } from 'react'
import styles from './styles.module.css'
import Listing from '../Listing/Listing'

export class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>{this.props.title}</h1>
        </div>
        <Listing 
        home={this.props.home}
        places={this.props.places}
        directions={this.props.directions}
        />
      </div>
    )
  }
}

export default Sidebar