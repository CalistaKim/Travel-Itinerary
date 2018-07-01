import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Item from './Item';
import styles from './styles.module.css'

export class Listing extends React.Component {

  renderFirstItem(){
    let home = this.props.home
    let origin = home.formatted_address
    let types = home.types
    return(
      <div className={styles.itemContainer}>
        <h1>{origin}</h1>
        { types.map((type,index) => {
          return(
            <p key={type+'_'+index} >{type}</p>
          )
        })}
      </div>
    )
  }

  testfunction(){
    console.log('test')
  }


  renderScheduleItems(){
    let scheduleitems
    scheduleitems = this.props.places.map((place,index) => {
      // console.log('each listing place: ', place)
      let active = (index === 0) ? true : false; 
      let directions = (active) ? this.props.directions : null;
      let gotDetails = (place.photos) ? true: false
      let {map, google} = this.props;
      let destination = place.geometry.location
      let opts = {}
      // let opts = {
      //   origin: center,
      //   destination: destination,
      //   travelMode: google.maps.TravelMode[selectedMode]
      // }

      // let callback=this.props.callback
      return (
        <Item 
        place={place}
        onClick={this.props.onClick}
        key={place.id+'_'+index} 
        directions={directions}
        isActive={active}
        gotDetails={gotDetails}
        onClick={this.testfunction}
        />
      )
    })
    return scheduleitems
  }
  
  render() {
    return (
      <div className={classnames(styles.container)}>
      {this.renderFirstItem()}

      {this.renderScheduleItems()}
      </div>
    )
  }
}

export default Listing