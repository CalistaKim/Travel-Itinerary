import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Rating from 'components/Rating/Rating';
import styles from './styles.module.css'

export class Item extends React.Component {
  render() {
    const {place} = this.props;
    let start_address='';
    let end_address='';
    let travel_time='';
    if (this.props.directions){
      // console.log('directions from item: ',this.props.directions)
      const directions = this.props.directions
      start_address= directions.start_address
      end_address= directions.end_address
      travel_time=directions.duration.text
    }
    return (
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <h1 className={classnames(styles.title)}>{place.name}</h1>
          <Rating percentage={place.rating/5}/>
        </div>
          <p>start address: {start_address}</p>
          <p>end address: {end_address}</p>
          <p>travel time: {travel_time}</p>
      </div>
    )
  }
}

export default Item