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

  renderScheduleItems(){
    let scheduleitems
    scheduleitems = this.props.places.map((place,index) => {
      // console.log('each listing place: ', place)
      let activeIndex = (this.props.activeIndex) ? this.props.activeIndex : false
      
      // console.log('IN LISTING: ACTIVEINDEX '+activeIndex)

      let active = ( index === activeIndex || (!activeIndex && index==0) ) ? true : false; 
      let directions = (active) ? this.props.directions : null;
      let gotDetails = (place.photos) ? true: false
      let {map, google} = this.props;
      let step = index
      return (
        <Item 
        place={place}
        onClick={this.props.onClick}
        key={place.id+'_'+index} 
        directions={directions}
        isActive={active}
        gotDetails={gotDetails}
        onClick={() => this.props.callback(google,map,this.props.places,step, active)}
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